import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { differenceInCalendarDays } from 'date-fns';
import { ObjectId } from 'mongodb';
import * as randomstring from 'randomstring';

import { config } from '@on/config';
import { PROPERTY_STATUS, TRANSACTION_STATUS } from '@on/enums';
import { EmailRecipient, sendEmail } from '@on/services/email';
import { sharedEmailTemplate } from '@on/services/email/templates/shared.template';
import { IPayment } from '@on/services/payment/interface';
import { PaystackService } from '@on/services/payment/paystack';
import { ServiceResponse } from '@on/utils/types';

import { PropertyDocument } from '../property/model/property.model';
import { PropertyRepository } from '../property/repository/property.repository';
import { CreateTransactionDto } from '../transaction/dto/create.dto';
import { TransactionRepository } from '../transaction/repository/transaction.repository';

import { UserDocument } from './../user/model/user.model';
import { BookingDto } from './dto/book.dto';
import { QueryBookingDto } from './dto/query.dto';
import { UpdateBookingDto } from './dto/update.dto';
import { Booking } from './model/booking.model';
import { BookingRepository } from './repository/booking.repository';
import { IBooking } from './types/booking.interface';

const baseUrl = config.app.baseUrl;

@Injectable()
export class BookingService {
  constructor(
    private readonly transaction: TransactionRepository,
    private readonly property: PropertyRepository,
    private readonly booking: BookingRepository,
    private readonly paystack: PaystackService,
  ) {}

  async book(user: UserDocument, bookingPayload: BookingDto): Promise<ServiceResponse> {
    const { propertyId, checkIn, checkOut } = bookingPayload;

    const property = await this.property.findById(new ObjectId(propertyId));

    if (!property) throw new NotFoundException('property not found');
    if (property.status === PROPERTY_STATUS.BOOKED) throw new ConflictException('property already booked');

    const propertyAvailable = await this.isPropertyAvailable(new ObjectId(propertyId), checkIn, checkOut);
    if (!propertyAvailable) throw new ConflictException('Property not available');

    const numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    if (numberOfDays < 2) throw new BadRequestException('You cannot book less than 2 days');

    const reference = randomstring.generate(15);

    const payload: IBooking = {
      propertyId: new ObjectId(propertyId),
      userId: user._id,
      paymentRef: reference,
      ...bookingPayload,
    };

    const bookingAmount = numberOfDays * Number(property.price) * 100;

    const paymentPayload: IPayment = {
      reference,
      email: user.email,
      amount: bookingAmount,
      callback_url: `${baseUrl}payment_hotel.html?propertyId=${propertyId}&userId=${user._id}`,
      metaData: payload,
    };

    const response = await this.paystack.initializePayment(paymentPayload);
    if (response.status !== true) throw new BadRequestException('unable to initialize payment');

    await this.createTransaction(property, user._id, paymentPayload.reference);

    payload.paymentUrl = response.data.authorization_url;
    const data = await this.booking.create(payload);

    return { data, message: `Bookings successfully made` };
  }

  async verifyBooking(reference: string): Promise<ServiceResponse> {
    const booking = await this.booking.findOne(
      { paymentRef: reference },
      { populate: [{ path: 'propertyId' }, { path: 'userId' }] },
    );
    if (!booking) throw new NotFoundException('Booking with paymentRef not found');

    const { propertyId } = booking;

    const { data } = await this.paystack.verifyPayment(reference);

    if (data.status.toLowerCase() !== 'success') {
      await this.transaction.updateOne({ reference }, { status: TRANSACTION_STATUS.FAILED });

      throw new BadRequestException(data.gateway_response);
    }

    await this.booking.updateById(booking._id, { isPaid: true });
    await this.transaction.updateOne({ reference }, { status: TRANSACTION_STATUS.COMPLETED });
    await this.property.updateById(new ObjectId(String(propertyId)), { status: PROPERTY_STATUS.BOOKED });

    const { subject, content, name } = this.generateEmailContent(booking);
    const value = sharedEmailTemplate({ subject, content, name });

    const recipient: EmailRecipient = { email: booking.userId.email, name: booking.userId.firstName };
    await sendEmail({ recipient, value, subject });

    return { data: null, message: `Booking verified successfully` };
  }

  async find(filter: QueryBookingDto, skip?, limit?): Promise<ServiceResponse> {
    const data = await this.booking.findAndCount(filter, {
      aggregate: { skip, limit },
      populate: [{ path: 'propertyId' }, { path: 'userId' }],
    });

    return { data, message: `Bookings successfully fetched` };
  }

  async update(id: ObjectId | string, updateBookingPayload: UpdateBookingDto): Promise<ServiceResponse> {
    const { checkIn = null, checkOut = null } = updateBookingPayload;

    const booking = await this.booking.findById(new ObjectId(id));
    const propertyId = String(booking.propertyId) || updateBookingPayload.propertyId;

    if (checkIn || checkOut) {
      const property = await this.property.findById(new ObjectId(propertyId));
      if (!property) throw new NotFoundException('property not found');

      const propertyAvailable = await this.isPropertyAvailable(new ObjectId(propertyId), checkIn, checkOut);
      if (!propertyAvailable) throw new ConflictException('Property not available');
    }

    const data = await this.booking.updateById(new ObjectId(id), updateBookingPayload);

    return { data, message: `Bookings successfully updated` };
  }

  async delete(id: ObjectId | string): Promise<ServiceResponse> {
    const booking = await this.booking.findById(new ObjectId(id));
    if (!booking) throw new NotFoundException('booking not found');

    await this.booking.deleteById(new ObjectId(id));

    return { data: null, message: 'Booking deleted successfully' };
  }

  private async isPropertyAvailable(
    propertyId: ObjectId,
    proposedCheckIn: Date,
    proposedCheckOut: Date,
  ): Promise<boolean> {
    const bookings = await this.booking.find({ propertyId });

    const checkInDate = new Date(proposedCheckIn);

    checkInDate.setDate(checkInDate.getDate() - 1);

    const isAvailable = !bookings.some((booking: Booking) => {
      const bookingCheckout = new Date(booking.checkOut);
      return checkInDate < bookingCheckout;
    });

    const isOverlapping = bookings.some(
      (booking: Booking) =>
        (proposedCheckIn >= booking.checkIn && proposedCheckIn < booking.checkOut) ||
        (proposedCheckOut > booking.checkIn && proposedCheckOut <= booking.checkOut) ||
        (proposedCheckIn <= booking.checkIn && proposedCheckOut >= booking.checkOut),
    );

    return isAvailable && !isOverlapping;
  }

  private async createTransaction(property: PropertyDocument, userId: ObjectId, reference: string) {
    const payload: CreateTransactionDto | any = {
      propertyId: property._id,
      userId,
      // amount: property.price,
      amount: null,
      status: TRANSACTION_STATUS.PENDING,
      reference,
    };

    return await this.transaction.create(payload);
  }

  private generateEmailContent(booking: Booking) {
    const { userId, propertyId, checkIn } = booking;

    const subject = `Booking Confirmation for ${propertyId.name}<br/>`;

    const content = `
    Thank you for booking ${propertyId.name} with us!<br/><br/>

    Here are your booking details:<br/>
    - Property Name: ${propertyId.name} <br/>
    - Booking Date: ${checkIn} <br/>

    We are excited to host you and ensure you have a pleasant stay.<br/><br/>
  `;
    return { subject, content, name: userId.firstName };
  }
}

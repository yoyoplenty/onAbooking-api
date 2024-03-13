import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { PROPERTY_STATUS } from '@on/enums';
import { ServiceResponse } from '@on/utils/types';

import { PropertyRepository } from '../property/repository/property.repository';

import { UserDocument } from './../user/model/user.model';
import { BookingDto } from './dto/book.dto';
import { QueryBookingDto } from './dto/query.dto';
import { UpdateBookingDto } from './dto/update.dto';
import { Booking } from './model/booking.model';
import { BookingRepository } from './repository/booking.repository';
import { IBooking } from './types/booking.interface';

@Injectable()
export class BookingService {
  constructor(
    private readonly booking: BookingRepository,
    private readonly property: PropertyRepository,
  ) {}

  async book(user: UserDocument, bookingPayload: BookingDto): Promise<ServiceResponse> {
    const { propertyId, checkIn, checkOut } = bookingPayload;

    const property = await this.property.findById(new ObjectId(propertyId));

    if (!property) throw new NotFoundException('property not found');
    if (property.status === PROPERTY_STATUS.BOOKED) throw new ConflictException('property already booked');

    const propertyAvailable = await this.isPropertyAvailable(new ObjectId(propertyId), checkIn, checkOut);
    if (!propertyAvailable) throw new ConflictException('Property not available');

    const payload: IBooking = {
      propertyId: new ObjectId(propertyId),
      userId: user._id,
      ...bookingPayload,
    };

    const data = await this.booking.create(payload);

    return { data, message: `Bookings successfully made` };
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

  async isPropertyAvailable(propertyId: ObjectId, proposedCheckIn: Date, proposedCheckOut: Date): Promise<boolean> {
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
}

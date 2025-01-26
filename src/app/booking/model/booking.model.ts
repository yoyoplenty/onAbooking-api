import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

import { Property } from '@on/app/property/model/property.model';
import { User } from '@on/app/user/model/user/user.model';
import { BOOKING_STATUS, PAYMENT_STATUS } from '@on/enums';

import { IBooking, IGuest } from '../types/booking.interface';

import { GuestSchema } from './guest.model';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ collection: 'bookings', versionKey: false, timestamps: true })
export class Booking implements IBooking {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Property' })
  propertyId: Property;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @ApiProperty()
  @Prop({ required: true, type: GuestSchema })
  guest: IGuest;

  @ApiProperty()
  @Prop({ required: true, type: Date })
  checkIn: Date;

  @ApiProperty()
  @Prop({ required: true, type: Date })
  checkOut: Date;

  @ApiProperty()
  @Prop({ type: Number, required: false })
  price: number;

  @ApiProperty()
  @Prop({ enum: PAYMENT_STATUS, default: PAYMENT_STATUS.UNPAID })
  paymentStatus: PAYMENT_STATUS;

  @ApiProperty()
  @Prop({ enum: BOOKING_STATUS, default: BOOKING_STATUS.PENDING })
  status: BOOKING_STATUS;

  @ApiProperty()
  @Prop({ type: String, required: false })
  reference: string;

  @ApiProperty()
  @Prop({ required: true, type: String })
  paymentUrl: string;

  @ApiProperty()
  @Prop({ required: true, type: String })
  paymentRef: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

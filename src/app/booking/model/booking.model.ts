import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

import { Property } from '@on/app/property/model/property.model';
import { User } from '@on/app/user/model/user.model';

import { IBooking } from '../types/booking.interface';

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
  @Prop({ required: false, type: Number })
  adultNo: number;

  @ApiProperty()
  @Prop({ required: false, type: Number })
  childNo: number;

  @ApiProperty()
  @Prop({ required: true, type: Date })
  checkIn: Date;

  @ApiProperty()
  @Prop({ required: true, type: Date })
  checkOut: Date;

  @ApiProperty()
  @Prop({ required: true, type: Boolean, default: false })
  isPaid: boolean;

  @ApiProperty()
  @Prop({ required: true, type: String })
  paymentUrl: string;

  @ApiProperty()
  @Prop({ required: true, type: String })
  paymentRef: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

import { ObjectId } from 'mongodb';

import { Property } from '@on/app/property/model/property.model';
import { User } from '@on/app/user/model/user/user.model';
import { BOOKING_STATUS, PAYMENT_STATUS } from '@on/enums';
import { IBaseType } from '@on/utils/types';

export interface IGuest {
  adults: number;
  children: number;
  teens?: number;
  infants?: number;
}

export interface IBooking extends IBaseType {
  propertyId: ObjectId | Property;
  guestId?: ObjectId | User;
  guest: IGuest;
  checkIn: Date;
  checkOut: Date;
  price: number;
  status: BOOKING_STATUS;
  paymentStatus: PAYMENT_STATUS;
  reference: string;
  paymentUrl: string;
  paymentRef: string;
}

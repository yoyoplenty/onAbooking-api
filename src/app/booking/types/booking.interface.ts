import { ObjectId } from 'mongodb';

import { Property } from '@on/app/property/model/property.model';
import { User } from '@on/app/user/model/user.model';
import { IBaseType } from '@on/utils/types';

export interface IBooking extends IBaseType {
  propertyId: ObjectId | Property;
  userId?: ObjectId | User;
  adultNo: number;
  childNo: number;
  checkIn: Date;
  checkOut: Date;
  isPaid: boolean;
  paymentUrl: string;
  paymentRef: string;
}

import { ObjectId } from 'mongodb';

import { IBaseType } from '@on/utils/types';

export interface IReview extends IBaseType {
  propertyId: ObjectId;
  guestId: ObjectId;
  cleanliness: number;
  responsiveness: number;
  comfort: number;
  locationAccuracy: number;
  comment: string;
}

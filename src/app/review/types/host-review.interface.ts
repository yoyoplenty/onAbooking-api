import { ObjectId } from 'mongodb';

import { IBaseType } from '@on/utils/types';

export interface IHostReview extends IBaseType {
  hostId: ObjectId;
  guestId: ObjectId;
  responsiveness: number;
  professionalism: number;
  hospitality: number;
  comment: string;
  hostComment: string;
}

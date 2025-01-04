import { ObjectId } from 'mongodb';

import { IBaseType } from '@on/utils/types';

export interface IUnavailability extends IBaseType {
  propertyId: ObjectId;
  dates: Date[];
}

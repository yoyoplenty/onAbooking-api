import { ObjectId } from 'mongodb';

import { Property } from '@on/app/property/model/property.model';
import { User } from '@on/app/user/model/user/user.model';
import { IBaseType } from '@on/utils/types';

export interface IFavorite extends IBaseType {
  propertyId: ObjectId | Property;
  userId: ObjectId | User;
}

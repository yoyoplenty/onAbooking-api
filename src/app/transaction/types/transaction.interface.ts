import { ObjectId } from 'mongoose';

import { Property } from '@on/app/property/model/property.model';
import { User } from '@on/app/user/model/user.model';
import { TRANSACTION_STATUS } from '@on/enums';
import { IBaseType } from '@on/utils/types';

export interface ITransaction extends IBaseType {
  propertyId: ObjectId | Property;
  userId: ObjectId | User;
  amount: number;
  status: TRANSACTION_STATUS;
  reference?: string;
}

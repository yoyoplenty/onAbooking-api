import { ObjectId } from 'mongodb';

import { Property } from '@on/app/property/model/property.model';
import { User } from '@on/app/user/model/user.model';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@on/enums';
import { IBaseType } from '@on/utils/types';

export interface ITransaction extends IBaseType {
  propertyId: ObjectId | Property;
  userId: ObjectId | User;
  amount: number;
  type: TRANSACTION_TYPE;
  description: string;
  date: Date;
  status: TRANSACTION_STATUS;
  reference?: string;
  paymentGatewayId?: string;
  metadata: Record<string, any>;
}

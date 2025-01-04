import { ObjectId } from 'mongodb';

import { IBaseType } from '@on/utils/types';

export interface IWallet extends IBaseType {
  userId: ObjectId;
  balance: number;
  pin: string;
}

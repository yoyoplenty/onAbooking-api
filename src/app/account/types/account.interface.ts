import { ObjectId } from 'mongodb';

import { IBaseType } from '@on/utils/types';

export interface IAccount extends IBaseType {
  hostId: ObjectId;
  iBan: string;
  bic: string;
  bankName: string;
  bankAddress: string;
  meta: Record<string, any>;
}

import { ObjectId } from 'mongodb';

import { TOKEN_TYPE } from '@on/enums';
import { IBaseType } from '@on/utils/types';

export interface IToken extends IBaseType {
  userId: ObjectId;
  type: TOKEN_TYPE;
  token: string;
  expireAt: Date;
}

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base.repository';

import { Account, AccountDocument } from '../model/account.model';

export class AccountRepository extends BaseRepository<AccountDocument> {
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {
    super(accountModel);
  }
}

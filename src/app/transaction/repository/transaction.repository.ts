import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base.repository';

import { Transaction, TransactionDocument } from '../model/transaction.model';

export class TransactionRepository extends BaseRepository<TransactionDocument> {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {
    super(transactionModel);
  }
}

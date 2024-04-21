import { Injectable } from '@nestjs/common';

import { ServiceResponse } from '@on/utils/types';

import { QueryTransactionDto } from './dto/query.dto';
import { TransactionRepository } from './repository/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transaction: TransactionRepository) {}

  async find(filter: QueryTransactionDto, skip?, limit?): Promise<ServiceResponse> {
    const { data, count } = await this.transaction.findAndCount(filter, { aggregate: { skip, limit } });

    const res = limit && skip ? { count, data } : data;

    return { data: res, message: `Transactions successfully fetched` };
  }
}

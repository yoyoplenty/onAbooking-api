import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';

import { ServiceResponse } from '@on/utils/types';

import { CreateTransactionDto } from './dto/create.dto';
import { QueryTransactionDto } from './dto/query.dto';
import { TransactionRepository } from './repository/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transaction: TransactionRepository) {}

  async create(payload: CreateTransactionDto): Promise<ServiceResponse> {
    payload.reference = randomstring.generate(15);

    const data = await this.transaction.create(payload);

    return { data, message: `Transactions created fetched` };
  }

  async find(filter: QueryTransactionDto, skip?, limit?): Promise<ServiceResponse> {
    const { data, count } = await this.transaction.findAndCount(filter, { aggregate: { skip, limit } });

    const res = limit && skip ? { count, data } : data;

    return { data: res, message: `Transactions successfully fetched` };
  }
}

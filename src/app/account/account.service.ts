import { Injectable } from '@nestjs/common';

import { ServiceResponse } from '@on/utils/types';

import { PropertyRepository } from '../property/repository/property.repository';
import { UserDocument } from '../user/model/user/user.model';

import { AccountRepository } from './repository/account.repository';

@Injectable()
export class AccountService {
  constructor(
    private readonly property: PropertyRepository,
    private readonly account: AccountRepository,
  ) {}

  async book(user: UserDocument): Promise<ServiceResponse> {
    const data = user;

    return { data, message: null };
  }
}

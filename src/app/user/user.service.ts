import { Injectable } from '@nestjs/common';

import { ServiceResponse } from '@on/utils/types';

import { regexSearchQuery } from './../../helpers/search-query';
import { QueryUserDto } from './dto/query.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly user: UserRepository) {}

  async find(query: QueryUserDto): Promise<ServiceResponse> {
    const searchFields = ['email', 'firstName', 'lastName'];
    const filter = query.search ? regexSearchQuery(searchFields, query.search, query) : query;

    const data = await this.user.find(filter);

    return { data, message: `users successfully fetched` };
  }
}

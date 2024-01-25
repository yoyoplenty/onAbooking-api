import { Injectable } from '@nestjs/common';

import { ServiceResponse } from '@on/utils/types';

import { QueryUserDto } from './dto/query.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly user: UserRepository) {}

  async find(filter: QueryUserDto): Promise<ServiceResponse> {
    const data = await this.user.find(filter);

    return { data, message: `users successfully fetched` };
  }
}

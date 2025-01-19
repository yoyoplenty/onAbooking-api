import { Injectable } from '@nestjs/common';

import { ServiceResponse } from '@on/utils/types';

import { PropertyRepository } from '../property/repository/property.repository';
import { UserDocument } from '../user/model/user/user.model';

import { UnavailabilityRepository } from './repository/unavailability.repository';

@Injectable()
export class UnavailabilityService {
  constructor(
    private readonly property: PropertyRepository,
    private readonly unavailability: UnavailabilityRepository,
  ) {}

  async book(user: UserDocument): Promise<ServiceResponse> {
    const data = user;

    return { data, message: null };
  }
}

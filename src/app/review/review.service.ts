import { Injectable } from '@nestjs/common';

import { ServiceResponse } from '@on/utils/types';

import { PropertyRepository } from '../property/repository/property.repository';
import { UserDocument } from '../user/model/user.model';

import { ReviewRepository } from './repository/review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly property: PropertyRepository,
    private readonly review: ReviewRepository,
  ) {}

  async book(user: UserDocument): Promise<ServiceResponse> {
    const data = user;

    return { data, message: null };
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';

import { ServiceResponse } from '@on/utils/types';

import { PropertyRepository } from '../property/repository/property.repository';
import { UserDocument } from '../user/model/user.model';

import { CreateReviewDto } from './dto/create.dto';
import { QueryReviewDto } from './dto/query.dto';
import { ReviewRepository } from './repository/review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly review: ReviewRepository,
    private readonly property: PropertyRepository,
  ) {}

  public async create(user: UserDocument, payload: CreateReviewDto): Promise<ServiceResponse> {
    const { propertyId } = payload;

    const property = await this.property.findById(propertyId);
    if (!property) throw new BadRequestException('Property not found');

    const existingReview = await this.review.findOne({ propertyId, guestId: user._id });
    if (existingReview) throw new BadRequestException('You have already reviewed this property');

    const data = await this.review.create({
      ...payload,
      guestId: user._id,
    });

    return { data, message: 'Review successfully created' };
  }

  public async find(filter: QueryReviewDto, skip?, limit?): Promise<ServiceResponse> {
    const data = await this.review.findAndCount(filter, {
      aggregate: { skip, limit },
    });

    return { data, message: `Bookings successfully fetched` };
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';

import { REVIEW_TYPE } from '@on/enums';
import { ServiceResponse } from '@on/utils/types';

import { PropertyRepository } from '../property/repository/property.repository';
import { UserDocument } from '../user/model/user/user.model';
import { UserRepository } from '../user/repository/user.repository';

import { CreateHostReviewDto } from './dto/host/create.dto';
import { QueryHostReviewDto } from './dto/host/query.dto';
import { CreateReviewDto } from './dto/property/create.dto';
import { QueryReviewDto } from './dto/property/query.dto';
import { UpdateReviewDto } from './dto/update.review';
import { HostReview } from './model/host-review.model';
import { Review } from './model/review.model';
import { HostReviewRepository } from './repository/host-review.repository';
import { ReviewRepository } from './repository/review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly user: UserRepository,
    private readonly review: ReviewRepository,
    private readonly property: PropertyRepository,
    private readonly hostReview: HostReviewRepository,
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

  public async createHost(user: UserDocument, payload: CreateHostReviewDto): Promise<ServiceResponse> {
    const { hostId } = payload;

    const host = await this.user.findById(hostId);
    if (!host) throw new BadRequestException('Host not found');

    const existingReview = await this.review.findOne({ hostId, guestId: user._id });
    if (existingReview) throw new BadRequestException('You have already reviewed this host');

    const data = await this.hostReview.create({
      ...payload,
      guestId: user._id,
    });

    return { data, message: 'Review successfully created' };
  }

  public async find(filter: QueryReviewDto, skip?, limit?): Promise<ServiceResponse> {
    const data = await this.review.findAndCount(filter, {
      aggregate: { skip, limit },
    });

    return { data, message: `Reviews successfully fetched` };
  }

  public async findHost(filter: QueryHostReviewDto, skip?, limit?): Promise<ServiceResponse> {
    const data = await this.hostReview.findAndCount(filter, {
      aggregate: { skip, limit },
    });

    return { data, message: `Host reviews successfully fetched` };
  }

  public async update(user: UserDocument, payload: UpdateReviewDto): Promise<ServiceResponse> {
    const { reviewId, reviewType, hostComment } = payload;

    const reviewRepositories = {
      [REVIEW_TYPE.PROPERTY]: this.review,
      [REVIEW_TYPE.HOST]: this.hostReview,
    };

    const reviewRepository = reviewRepositories[reviewType];
    if (!reviewRepository) throw new BadRequestException('Invalid review type');

    const review = await reviewRepository.findById(reviewId);
    if (!review) throw new BadRequestException(`${reviewType} review not found`);

    await this.validateHostAccess(user, review, reviewType);

    await reviewRepository.updateById(reviewId, { hostComment });

    return { data: null, message: 'Review successfully updated' };
  }

  private async validateHostAccess(user: UserDocument, review: Review | HostReview | any, reviewType: REVIEW_TYPE) {
    const isPropertyReview = reviewType === REVIEW_TYPE.PROPERTY;

    const entity = isPropertyReview ? await this.property.findById(review.propertyId) : null;
    const entityHostId = isPropertyReview ? entity?.hostId : review.hostId;

    if (!entityHostId || entityHostId.toString() !== user._id.toString())
      throw new BadRequestException(`Only the host can update this ${reviewType} review`);
  }
}

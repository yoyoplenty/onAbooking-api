import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base.repository';

import { Review, ReviewDocument } from '../model/review.model';

export class ReviewRepository extends BaseRepository<ReviewDocument> {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {
    super(reviewModel);
  }
}

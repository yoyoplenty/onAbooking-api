import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base.repository';

import { HostReview, HostReviewDocument } from '../model/host-review.model';

export class HostReviewRepository extends BaseRepository<HostReviewDocument> {
  constructor(@InjectModel(HostReview.name) private hostReviewModel: Model<HostReviewDocument>) {
    super(hostReviewModel);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PropertyModule } from '../property/property.module';
import { UserModule } from '../user/user.module';

import { HostReview, HostReviewSchema } from './model/host-review.model';
import { Review, ReviewSchema } from './model/review.model';
import { HostReviewRepository } from './repository/host-review.repository';
import { ReviewRepository } from './repository/review.repository';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: HostReview.name, schema: HostReviewSchema },
    ]),
    UserModule,
    PropertyModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewRepository, HostReviewRepository, ReviewService],
  exports: [ReviewRepository, HostReviewRepository, ReviewService],
})
export class ReviewModule {}

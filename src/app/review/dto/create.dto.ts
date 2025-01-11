import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsNumber, IsString, Max, Min } from 'class-validator';
import { ObjectId } from 'mongodb';

import { IReview } from '../types/review.interface';

export class CreateReviewDto implements IReview {
  @ApiProperty({ description: 'ID of the property being reviewed' })
  @IsNotEmpty()
  @IsMongoId()
  propertyId: ObjectId;

  @ApiProperty({ description: 'Rating given by the guest (1-5)', example: 4 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Review comment by the guest' })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiHideProperty()
  guestId: ObjectId;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsNumber, IsString, Max, Min } from 'class-validator';
import { ObjectId } from 'mongodb';

import { IReview } from '../../types/review.interface';

export class CreateReviewDto implements Omit<IReview, 'guestId' | 'hostComment'> {
  @ApiProperty({ description: 'ID of the property being reviewed' })
  @IsNotEmpty()
  @IsMongoId()
  propertyId: ObjectId;

  @ApiProperty({ example: 5, description: 'Rating for cleanliness (1-5)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  cleanliness: number;

  @ApiProperty({ example: 5, description: 'Rating for responsiveness (1-5)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  responsiveness: number;

  @ApiProperty({ example: 5, description: 'Rating for comfort (1-5)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  comfort: number;

  @ApiProperty({ example: 5, description: 'Rating for location accuracy (1-5)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  location: number;

  @ApiProperty({ description: 'Review comment by the guest' })
  @IsNotEmpty()
  @IsString()
  comment: string;
}

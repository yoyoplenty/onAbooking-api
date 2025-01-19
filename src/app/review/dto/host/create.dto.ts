import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsNumber, IsString, Max, Min } from 'class-validator';
import { ObjectId } from 'mongodb';

import { IHostReview } from '../../types/host-review.interface';

export class CreateHostReviewDto implements Omit<IHostReview, 'guestId' | 'hostComment'> {
  @ApiProperty({ description: 'ID of the host being reviewed' })
  @IsNotEmpty()
  @IsMongoId()
  hostId: ObjectId;

  @ApiProperty({ example: 5, description: 'Rating for cleanliness (1-5)' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  professionalism: number;

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
  hospitality: number;

  @ApiProperty({ description: 'Review comment by the guest' })
  @IsNotEmpty()
  @IsString()
  comment: string;
}

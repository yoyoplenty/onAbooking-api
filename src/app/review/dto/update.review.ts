import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';

import { REVIEW_TYPE } from '@on/enums';

export class UpdateReviewDto {
  @ApiProperty({ description: 'Review comment by the host' })
  @IsNotEmpty()
  @IsString()
  hostComment: string;

  @ApiProperty({ description: 'ID of the review to update', example: '61f2a1234b5678c9d0123456' })
  @IsNotEmpty({ message: 'Review ID is required' })
  @IsMongoId()
  reviewId: string;

  @ApiProperty({ enum: REVIEW_TYPE, description: 'Type of review (property or host)', example: REVIEW_TYPE.PROPERTY })
  @IsEnum(REVIEW_TYPE)
  @IsNotEmpty({ message: 'Review type is required' })
  reviewType: REVIEW_TYPE;
}

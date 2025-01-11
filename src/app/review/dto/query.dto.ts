import { ApiPropertyOptional } from '@nestjs/swagger';

import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryReviewDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Property id' })
  propertyId?: string;

  @ApiPropertyOptional({ description: 'Property id' })
  guestId?: string;
}

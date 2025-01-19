import { ApiPropertyOptional } from '@nestjs/swagger';

import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryHostReviewDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Property id' })
  hostId?: string;

  @ApiPropertyOptional({ description: 'Property id' })
  guestId?: string;
}

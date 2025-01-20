import { ApiPropertyOptional } from '@nestjs/swagger';

import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryFavoriteDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Property ID' })
  propertyId?: string;

  @ApiPropertyOptional({ description: 'User ID' })
  userId?: string;
}

import { ApiPropertyOptional } from '@nestjs/swagger';

import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryUnavailabilityDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Property id' })
  propertyId?: string;
}

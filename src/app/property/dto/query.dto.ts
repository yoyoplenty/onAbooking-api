import { ApiPropertyOptional } from '@nestjs/swagger';

import { LOCATION_TYPE, PROPERTY_TYPE } from '@on/enums';
import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryPropertyDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Property name' })
  name?: string;

  @ApiPropertyOptional({ description: 'Property type' })
  type?: PROPERTY_TYPE;

  @ApiPropertyOptional({ description: 'Location type' })
  location: LOCATION_TYPE;
}

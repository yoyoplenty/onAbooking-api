import { ApiPropertyOptional } from '@nestjs/swagger';

import { PROPERTY_TYPE } from '@on/enums';
import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryPropertyDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Property name' })
  name?: string;

  @ApiPropertyOptional({ description: 'Property type' })
  type?: PROPERTY_TYPE;
}

import { ApiPropertyOptional } from '@nestjs/swagger';

import { PROPERTY_FILE_TYPE } from '@on/enums';
import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryPropertyImageDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Property id' })
  propertyId?: string;

  @ApiPropertyOptional({ description: 'Property image type', enum: PROPERTY_FILE_TYPE })
  type?: PROPERTY_FILE_TYPE;
}

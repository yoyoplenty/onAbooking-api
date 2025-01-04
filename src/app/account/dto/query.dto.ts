import { ApiPropertyOptional } from '@nestjs/swagger';

import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryAccountDto extends QueryDto {
  @ApiPropertyOptional({ description: 'User id' })
  userId?: string;
}

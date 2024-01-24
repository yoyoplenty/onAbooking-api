import { ApiPropertyOptional } from '@nestjs/swagger';

import { PaginationDto } from './pagination.dto';

export class QueryDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'The category id' })
  id?: number;

  @ApiPropertyOptional({ description: 'search parameter' })
  search?: string;
}

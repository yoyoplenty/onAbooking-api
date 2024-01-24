import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ description: 'The offset number' })
  offset?: number;

  @ApiPropertyOptional({ description: 'The number of limit' })
  limit?: number;

  @ApiPropertyOptional({ description: 'Sort order', type: 'integer' })
  sortOrder?: -1 | 1;
}

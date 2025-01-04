import { ApiPropertyOptional } from '@nestjs/swagger';

import { ROLE } from '@on/enums';
import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryUserDto extends QueryDto {
  @ApiPropertyOptional({ description: 'first name' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'last name' })
  lastName?: string;

  @ApiPropertyOptional({ description: 'middle name' })
  middleName?: string;

  @ApiPropertyOptional({ description: 'email' })
  email?: string;

  @ApiPropertyOptional({ description: 'email' })
  country?: string;

  @ApiPropertyOptional({ description: 'email' })
  status?: string;

  @ApiPropertyOptional({ description: 'role' })
  role?: ROLE;
}

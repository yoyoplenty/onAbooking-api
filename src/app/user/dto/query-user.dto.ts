import { ApiPropertyOptional } from '@nestjs/swagger';

import { ROLE } from '@on/enums';
import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryUserDto extends QueryDto {
  @ApiPropertyOptional({ description: 'username' })
  userName?: string;

  @ApiPropertyOptional({ description: 'first name' })
  firstName?: string;

  @ApiPropertyOptional({ description: 'last name' })
  lastName?: string;

  @ApiPropertyOptional({ description: 'middle name' })
  middleName?: string;

  @ApiPropertyOptional({ description: 'email' })
  email?: string;

  @ApiPropertyOptional({ description: 'role' })
  role?: ROLE;
}

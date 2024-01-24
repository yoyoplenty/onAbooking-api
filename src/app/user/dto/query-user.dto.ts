import { ApiPropertyOptional } from '@nestjs/swagger';

import { ROLE } from '@on/enums';
import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryUserDto extends QueryDto {
  @ApiPropertyOptional({ example: 'plenty003' })
  userName?: string;

  @ApiPropertyOptional({ example: 'jane' })
  firstName?: string;

  @ApiPropertyOptional({ example: 'doe' })
  lastName?: string;

  @ApiPropertyOptional({ example: 'mee' })
  middleName?: string;

  @ApiPropertyOptional({ example: 'doe' })
  search?: string;

  @ApiPropertyOptional({ example: 'admin@gmail.com' })
  email?: string;

  @ApiPropertyOptional({ example: 'user' })
  role?: ROLE;
}

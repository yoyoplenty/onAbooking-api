import { ApiPropertyOptional } from '@nestjs/swagger';

import { TRANSACTION_STATUS } from '@on/enums';
import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryTransactionDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Transaction status', type: TRANSACTION_STATUS })
  status?: TRANSACTION_STATUS;

  @ApiPropertyOptional({ description: 'Property ID' })
  propertyId?: string;

  @ApiPropertyOptional({ description: 'User ID' })
  userId?: string;

  @ApiPropertyOptional({ description: 'Transaction amount' })
  amount?: number;

  @ApiPropertyOptional({ description: 'Transaction reference' })
  reference?: string;
}

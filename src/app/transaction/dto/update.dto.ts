import { PartialType } from '@nestjs/swagger';

import { CreateTransactionDto } from './create.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}

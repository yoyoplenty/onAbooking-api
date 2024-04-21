import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';

import { TRANSACTION_STATUS } from '@on/enums';

import { ITransaction } from '../types/transaction.interface';

export class CreateTransactionDto implements ITransaction {
  @ApiProperty({ description: 'The property ID', type: String, format: 'ObjectId' })
  @IsMongoId()
  @IsNotEmpty()
  propertyId: ObjectId;

  @ApiProperty({ description: 'The user ID', type: String, format: 'ObjectId' })
  @IsMongoId()
  @IsNotEmpty()
  userId: ObjectId;

  @ApiProperty({ description: 'The transaction status', type: TRANSACTION_STATUS })
  @IsMongoId()
  @IsNotEmpty()
  status: TRANSACTION_STATUS;

  @ApiProperty({ description: 'The Transaction amount', type: Number })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiHideProperty()
  reference: string;
}

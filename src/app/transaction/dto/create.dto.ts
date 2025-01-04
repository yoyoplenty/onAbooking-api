import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsNumber, IsEnum, IsString, IsDateString, IsOptional, IsObject } from 'class-validator';
import { ObjectId } from 'mongodb';

import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@on/enums';

import { ITransaction } from '../types/transaction.interface';

export class CreateTransactionDto implements ITransaction {
  @ApiProperty({ description: 'The ID of the property related to the transaction' })
  @IsMongoId()
  @IsNotEmpty()
  propertyId: ObjectId;

  @ApiProperty({ description: 'The ID of the user initiating the transaction' })
  @IsMongoId()
  @IsNotEmpty()
  userId: ObjectId;

  @ApiProperty({ description: 'The transaction amount' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'A description of the transaction' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The type of the transaction (DEBIT or CREDIT)', enum: TRANSACTION_TYPE })
  @IsEnum(TRANSACTION_TYPE)
  @IsNotEmpty()
  type: TRANSACTION_TYPE;

  @ApiProperty({ description: 'The date of the transaction' })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'The status of the transaction (PENDING, COMPLETED, or FAILED)',
    enum: TRANSACTION_STATUS,
  })
  @IsEnum(TRANSACTION_STATUS)
  @IsNotEmpty()
  status: TRANSACTION_STATUS;

  @ApiProperty({ description: 'The ID of the payment gateway used for the transaction', required: false })
  @IsString()
  @IsOptional()
  paymentGatewayId?: string;

  @ApiProperty({ description: 'Additional metadata related to the transaction' })
  @IsObject()
  @IsNotEmpty()
  metadata: Record<string, any>;

  @ApiHideProperty()
  reference: string;
}

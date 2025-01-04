import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument, Types } from 'mongoose';

import { Property } from '@on/app/property/model/property.model';
import { User } from '@on/app/user/model/user.model';
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from '@on/enums';

import { ITransaction } from '../types/transaction.interface';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ collection: 'transactions', versionKey: false, timestamps: true })
export class Transaction implements ITransaction {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Property' })
  propertyId: Property | ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User | ObjectId;

  @ApiProperty()
  @Prop({ type: Number })
  amount: number;

  @ApiProperty()
  @Prop({ type: String, enum: TRANSACTION_TYPE, required: true })
  type: TRANSACTION_TYPE;

  @ApiProperty()
  @Prop({ type: String, enum: TRANSACTION_TYPE, required: true })
  description: string;

  @ApiProperty()
  @Prop({ type: Date })
  date: Date;

  @ApiProperty()
  @Prop({ type: String, enum: TRANSACTION_STATUS, default: TRANSACTION_STATUS.PENDING })
  status: TRANSACTION_STATUS;

  @ApiProperty()
  @Prop({ type: String })
  reference?: string;

  @ApiProperty()
  @Prop({ type: String })
  paymentGatewayId?: string;

  @ApiProperty()
  @Prop({ type: String })
  metadata: Record<string, any>;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

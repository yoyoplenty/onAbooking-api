import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import mongoose, { HydratedDocument } from 'mongoose';

import { Property } from '@on/app/property/model/property.model';
import { User } from '@on/app/user/model/user.model';
import { TRANSACTION_STATUS } from '@on/enums';

import { ITransaction } from '../types/transaction.interface';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ collection: 'transactions', versionKey: false, timestamps: true })
export class Transaction implements ITransaction {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Property' })
  propertyId: Property | ObjectId;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User | ObjectId;

  @ApiProperty()
  @Prop({ type: String })
  amount: number;

  @ApiProperty()
  @Prop({ type: String, enum: TRANSACTION_STATUS, default: TRANSACTION_STATUS.PENDING })
  status: TRANSACTION_STATUS;

  @ApiProperty()
  @Prop({ type: String })
  reference?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

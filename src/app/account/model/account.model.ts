import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument, Types } from 'mongoose';

import { IAccount } from '../types/account.interface';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ collection: 'reviews', versionKey: false, timestamps: true })
export class Account implements IAccount {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: true })
  iBan: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  bic: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  bankName: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  bankAddress: string;

  @ApiProperty()
  @Prop({ type: Object, required: false })
  meta: Record<string, any>;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument, Types } from 'mongoose';

import { IWallet } from '../types/wallet.interface';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ collection: 'wallets', versionKey: false, timestamps: true })
export class Wallet implements IWallet {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: ObjectId;

  @ApiProperty()
  @Prop({ type: Number })
  balance: number;

  @ApiProperty()
  @Prop({ type: String, required: false })
  pin: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

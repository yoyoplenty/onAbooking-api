import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument, Types } from 'mongoose';

import { IHost, IHostRules, IVerification, IWallet } from '../../types/host.interface';

import { HostRulesSchema, VerificationSchema, WalletSchema } from './details.model';

export type HostDocument = HydratedDocument<Host>;

@Schema({ collection: 'hosts', versionKey: false, timestamps: true })
export class Host implements IHost {
  @ApiProperty({ description: 'User ID of the host' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @ApiProperty({ example: 'Experienced host with a beautiful home.', description: 'Host bio' })
  @Prop({ required: false })
  bio: string;

  @ApiProperty({ type: WalletSchema, description: 'Wallet details' })
  @Prop({ type: WalletSchema, required: true })
  wallet: IWallet;

  @ApiProperty({ type: VerificationSchema, description: 'Verification details of the host' })
  @Prop({ type: VerificationSchema, required: true })
  verification: IVerification;

  @ApiProperty({ type: HostRulesSchema, description: 'Hosting rules' })
  @Prop({ type: HostRulesSchema, required: true })
  rules: IHostRules;

  @ApiProperty({ example: 'active', description: 'Batch state of the host' })
  @Prop({ required: true })
  batchState: string;
}

export const HostSchema = SchemaFactory.createForClass(Host);

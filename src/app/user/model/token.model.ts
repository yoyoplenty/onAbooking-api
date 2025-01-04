import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument, Types } from 'mongoose';

import { TOKEN_TYPE } from '@on/enums';

import { IToken } from '../types/token.interface';

export type TokenDocument = HydratedDocument<Token>;

@Schema({ collection: 'tokens', versionKey: false, timestamps: true })
export class Token implements IToken {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: ObjectId;

  @ApiProperty()
  @Prop({ enum: TOKEN_TYPE, required: true })
  type: TOKEN_TYPE;

  @ApiProperty()
  @Prop({ type: String, required: true })
  token: string;

  @ApiProperty()
  @Prop({ type: Date, default: () => new Date(Date.now() + 10 * 60 * 1000) })
  expireAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

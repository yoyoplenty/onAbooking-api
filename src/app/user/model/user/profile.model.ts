import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { IProfile } from '../../types/user.interface';

@Schema({ _id: false })
export class Profile implements IProfile {
  @ApiProperty()
  @Prop({ type: String, required: true })
  avatar: string;

  @ApiProperty()
  @Prop({ type: [String], required: true })
  languages: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

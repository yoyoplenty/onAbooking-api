import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

import { ROLE, USER_STATUS } from '@on/enums';

import { IUser, IProfile } from '../types/user.interface';

import { ProfileSchema } from './profile.model';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', versionKey: false, timestamps: true })
export class User implements IUser {
  @ApiProperty()
  @Prop({ type: String, required: true })
  firstName: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  lastName: string;

  @ApiProperty()
  @Prop({ type: String })
  middleName: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  email: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  country: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  countryCode: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  phoneNumber: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  password: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  dob: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: ROLE.GUEST })
  role: ROLE;

  @ApiProperty()
  @Prop({ type: ProfileSchema, required: true })
  profile: IProfile;

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  isVerified: boolean;

  @ApiProperty()
  @Prop({ enum: USER_STATUS, required: true, default: USER_STATUS.INACTIVE })
  status: USER_STATUS;

  @ApiProperty()
  @Prop({ type: String })
  referralCode: string;

  @ApiProperty()
  @Prop({ type: Date })
  lastLogin: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';

import { ROLE, USER_STATUS } from '@on/enums';

import { IUser, IProfile } from '../types/user.interface';

import { ProfileSchema } from './profile.model';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', versionKey: false, timestamps: true })
export class User extends Document implements IUser {
  @ApiProperty()
  @Prop({ type: String, required: false })
  firstName: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  lastName: string;

  @ApiProperty()
  @Prop({ type: String })
  middleName: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  email: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  country: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  countryCode: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  phoneNumber: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  password: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  dob: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: ROLE.GUEST })
  role: ROLE;

  @ApiProperty()
  @Prop({ type: ProfileSchema, required: false })
  profile: IProfile;

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  isPhoneVerified: boolean;

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  isEmailVerified: boolean;

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

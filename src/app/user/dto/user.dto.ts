import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsDateString, Length } from 'class-validator';

import { ROLE, USER_STATUS } from '@on/enums';

export class UserDto {
  @ApiProperty({ description: 'First name of the user', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ description: 'Last name of the user', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ description: 'Middle name of the user', required: false })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ description: 'Email address of the user', required: false, example: 'example@mail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Password of the user', required: false })
  @IsOptional()
  @IsString()
  @Length(6, 50)
  password?: string;

  @ApiProperty({ description: 'Date of birth of the user (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsDateString()
  dob?: string;

  @ApiProperty({ description: 'Role of the user', enum: ROLE, default: ROLE.GUEST, required: false })
  @IsOptional()
  @IsEnum(ROLE)
  role?: ROLE;

  @ApiProperty({ description: 'Profile information of the user', required: false })
  @IsOptional()
  profile?: Record<string, any>;

  @ApiProperty({ description: 'Referral code of the user', required: false })
  @IsOptional()
  @IsString()
  referralCode?: string;

  @ApiHideProperty()
  country: string;

  @ApiHideProperty()
  countryCode: string;

  @ApiHideProperty()
  phoneNumber: string;

  @ApiHideProperty()
  lastLogin?: string;

  @ApiHideProperty()
  isPhoneVerified?: boolean;

  @ApiHideProperty()
  isEmailVerified?: boolean;

  @ApiHideProperty()
  status?: USER_STATUS;
}

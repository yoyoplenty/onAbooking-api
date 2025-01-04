import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ROLE } from '@on/enums';

import { IRegister } from '../types/auth.interface';

export class RegisterDto implements IRegister {
  @ApiProperty({ description: 'User country' })
  @IsEmail()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: 'User phone number' })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ description: 'User country code' })
  @IsEmail()
  @IsNotEmpty()
  countryCode: string;

  @IsEnum(ROLE)
  @ApiProperty({ enum: ROLE, description: 'User role (admin or user)' })
  role: ROLE;
}

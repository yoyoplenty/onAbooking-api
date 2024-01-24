import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { ROLE } from '@on/enums';

import { IRegister } from '../types/auth.interface';

export class RegisterDto implements IRegister {
  @ApiProperty({ description: 'User first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'User username' })
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User phone number' })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsEnum(ROLE)
  @ApiProperty({ enum: ROLE, description: 'User role (admin or user)' })
  role: ROLE;

  @ApiProperty({ description: 'User password' })
  @Length(7, 20)
  @IsString()
  @IsNotEmpty()
  password: string;
}

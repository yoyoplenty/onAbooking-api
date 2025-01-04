import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { ROLE } from '@on/enums';
import { PhoneDto, PhoneEmailDto } from '@on/utils/dto/shared.dto';

import { ILogin, IRegister } from '../types/auth.interface';

export class RegisterDto extends PhoneDto implements IRegister {
  @ApiProperty({ description: 'User country' })
  @IsEmail()
  @IsNotEmpty()
  country: string;

  @IsEnum(ROLE)
  @ApiProperty({ enum: ROLE, description: 'User role (admin or user)' })
  role: ROLE;
}

export class LoginDto extends PhoneEmailDto implements ILogin {
  @ApiProperty({ example: 'Admin100' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ResetPasswordDto extends PhoneEmailDto {
  @ApiProperty({ example: 'Admin100' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ example: '456294' })
  @IsString()
  @IsNotEmpty()
  token: string;
}

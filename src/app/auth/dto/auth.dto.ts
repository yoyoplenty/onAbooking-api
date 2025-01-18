import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserDto } from '@on/app/user/dto/user.dto';
import { ROLE } from '@on/enums';
import { PhoneEmailDto } from '@on/utils/dto/shared.dto';

import { ILogin, IRegister } from '../types/auth.interface';

export class RegisterDto extends PhoneEmailDto implements IRegister {
  @ApiProperty({ description: 'User country' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsEnum(ROLE)
  @ApiProperty({ enum: ROLE, description: 'User role (admin or user)' })
  role: ROLE;
}

export class CompleteRegistrationDto extends OmitType(UserDto, ['role', 'country', 'profile'] as const) {}

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

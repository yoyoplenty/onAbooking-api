import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ILogin } from '../types/auth.interface';

export class LoginDto implements ILogin {
  @ApiProperty({ example: 'admin@mailinator.com' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'Admin100' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

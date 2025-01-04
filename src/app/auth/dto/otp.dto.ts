import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class EmailVerificationDto {
  @ApiProperty({ description: 'The OTP for verification' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class PhoneVerificationDto {
  @ApiProperty({ description: 'The OTP for verification' })
  @IsNotEmpty({ message: 'Token is required' })
  @IsString({ message: 'Token must be a string' })
  token: string;

  @ApiProperty({ description: 'The country code of the user' })
  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @ApiProperty({ description: 'The phone number of the user', example: '1234567890' })
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\d{7,15}$/, { message: 'Phone number must be between 7 and 15 digits' })
  phoneNumber: string;
}

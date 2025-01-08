import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class PhoneDto {
  @ApiProperty({ description: 'Country code of the user', example: '234' })
  @IsString()
  @IsOptional()
  countryCode: string;

  @ApiProperty({ description: 'Phone number of the user', example: '7049965569' })
  @IsString()
  @IsOptional()
  phoneNumber: string;
}

export class EmailDto {
  @ApiProperty({ description: 'Email of the user' })
  @IsEmail()
  @IsOptional()
  email: string;
}

export class PhoneEmailDto extends PhoneDto {
  @ApiProperty({ description: 'Email of the user' })
  @IsEmail()
  @IsOptional()
  email: string;
}

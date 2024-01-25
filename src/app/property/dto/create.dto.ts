import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';

import { PROPERTY_STATUS, PROPERTY_TYPE } from '@on/enums';
import { PropertyUploadDto } from '@on/utils/dto/property-upload.dto';

export class CreatePropertyDto extends PropertyUploadDto {
  @ApiProperty({ description: 'Property name', required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Property price', required: true })
  @IsNotEmpty()
  price: number;

  @ApiPropertyOptional({ description: 'Property description', required: true })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Property type', enum: PROPERTY_TYPE })
  @IsEnum(PROPERTY_TYPE)
  @IsOptional()
  type: PROPERTY_TYPE;

  @ApiPropertyOptional({ description: 'Property status', enum: PROPERTY_STATUS })
  @IsEnum(PROPERTY_STATUS)
  @IsOptional()
  status: PROPERTY_STATUS;

  @ApiHideProperty()
  images: any;
}

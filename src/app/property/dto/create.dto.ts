import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { PROPERTY_TYPE } from '@on/enums';
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

  @ApiProperty({ description: 'Property type', required: true })
  @IsOptional()
  @IsString()
  type: PROPERTY_TYPE;

  @ApiHideProperty()
  images: any;
}

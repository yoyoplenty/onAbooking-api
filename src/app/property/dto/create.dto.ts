import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsEnum, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';

import { PROPERTY_STATUS, PROPERTY_TYPE } from '@on/enums';
import { transformStringToObject } from '@on/helpers';
import { PropertyUploadDto } from '@on/utils/dto/property-upload.dto';

import { FeaturesDto, LocationDto, PriceDto } from './extras.dto';

export class CreatePropertyDto extends PropertyUploadDto {
  @ApiProperty({ description: 'Name of the property', example: 'Cozy Cottage' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the property', example: 'A cozy cottage in the countryside' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Property type', enum: PROPERTY_TYPE })
  @IsEnum(PROPERTY_TYPE)
  @IsOptional()
  type: PROPERTY_TYPE;

  @ApiProperty({ description: 'Location details of the property' })
  @ValidateNested()
  @Transform(transformStringToObject)
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty({ description: 'Property features' })
  @ValidateNested()
  @Transform(transformStringToObject)
  @Type(() => FeaturesDto)
  features: FeaturesDto;

  @ApiProperty({ description: 'Price details of the property' })
  @ValidateNested()
  @Transform(transformStringToObject)
  @Type(() => PriceDto)
  price: PriceDto;

  @ApiPropertyOptional({ description: 'Property status', enum: PROPERTY_STATUS })
  @IsEnum(PROPERTY_STATUS)
  @IsOptional()
  status: PROPERTY_STATUS;

  @ApiHideProperty()
  hostId: ObjectId;

  @ApiHideProperty()
  images: any;
}

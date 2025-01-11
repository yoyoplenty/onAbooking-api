import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsNumber, IsArray, ValidateNested, IsBoolean, IsObject } from 'class-validator';

import { PROPERTY_STATUS, PROPERTY_TYPE } from '@on/enums';
import { transformStringToObject } from '@on/helpers';
import { QueryDto } from '@on/utils/dto/query.dto';

export class CoordinatesFilterDto {
  @ApiPropertyOptional({ description: 'Minimum latitude for property location' })
  @IsOptional()
  @IsNumber()
  minLat?: number;

  @ApiPropertyOptional({ description: 'Maximum latitude for property location' })
  @IsOptional()
  @IsNumber()
  maxLat?: number;

  @ApiPropertyOptional({ description: 'Minimum longitude for property location' })
  @IsOptional()
  @IsNumber()
  minLng?: number;

  @ApiPropertyOptional({ description: 'Maximum longitude for property location' })
  @IsOptional()
  @IsNumber()
  maxLng?: number;
}

export class QueryPropertyDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Filter by property name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Filter by property host ID' })
  @IsOptional()
  @IsString()
  hostId?: string;

  @ApiPropertyOptional({ description: 'Filter by property type', enum: PROPERTY_TYPE })
  @IsOptional()
  @IsEnum(PROPERTY_TYPE)
  type?: PROPERTY_TYPE;

  @ApiPropertyOptional({ description: 'Filter by property status', enum: PROPERTY_STATUS })
  @IsOptional()
  @IsEnum(PROPERTY_STATUS)
  status?: PROPERTY_STATUS;

  @ApiPropertyOptional({ description: 'Filter by city' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'Filter by state' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Filter by country' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ type: CoordinatesFilterDto, description: 'Filter by location coordinates' })
  @IsOptional()
  @ValidateNested()
  @Transform(transformStringToObject)
  @Type(() => CoordinatesFilterDto)
  coordinates?: CoordinatesFilterDto;

  @ApiPropertyOptional({ description: 'Filter by minimum number of bathrooms' })
  @IsOptional()
  @IsNumber()
  minBathrooms?: number;

  @ApiPropertyOptional({ description: 'Filter by minimum number of bedrooms' })
  @IsOptional()
  @IsNumber()
  minBedrooms?: number;

  @ApiPropertyOptional({ description: 'Filter by minimum number of kitchens' })
  @IsOptional()
  @IsNumber()
  minKitchens?: number;

  @ApiPropertyOptional({ description: 'Filter by property amenities (e.g., has WiFi)' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiPropertyOptional({ description: 'Filter by minimum price' })
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Filter by maximum price' })
  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Filter by price details' })
  @IsOptional()
  @IsObject()
  price?: {
    amount?: number;
    discountedAmount?: number;
    currency?: string;
  };

  @ApiPropertyOptional({ description: 'Filter by property features' })
  @IsOptional()
  @IsObject()
  features?: {
    amenities?: {
      wifi?: boolean;
      pool?: boolean;
      parking?: boolean;
      extra?: Record<string, boolean>[];
    };
    details?: {
      bathroom?: number;
      bedroom?: number;
      kitchens?: number;
      tv?: number;
    };
    occupancy?: {
      adults?: number;
      teenagers?: number;
      kids?: number;
      toddlers?: number;
      infants?: number;
      pets?: number;
    };
    accessibility?: {
      entrance?: string[];
      bedrooms?: string[];
      bathrooms?: string[];
    };
    bookingOptions?: string[];
  };

  @ApiPropertyOptional({ description: 'Filter by property description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Filter by admin status' })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @ApiPropertyOptional({ description: 'Filter by number of adults' })
  adults?: number;

  @ApiPropertyOptional({ description: 'Filter by number of teenagers' })
  @IsOptional()
  @IsNumber()
  teenagers?: number;

  @ApiPropertyOptional({ description: 'Filter by number of kids' })
  @IsOptional()
  @IsNumber()
  kids?: number;

  @ApiPropertyOptional({ description: 'Filter by number of toddlers' })
  @IsOptional()
  @IsNumber()
  toddlers?: number;

  @ApiPropertyOptional({ description: 'Filter by number of infants' })
  @IsOptional()
  @IsNumber()
  infants?: number;

  @ApiPropertyOptional({ description: 'Filter by number of pets' })
  @IsOptional()
  @IsNumber()
  pets?: number;
}

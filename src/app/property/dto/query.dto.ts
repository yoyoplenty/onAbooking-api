import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';

import { PROPERTY_STATUS, PROPERTY_TYPE } from '@on/enums';
import { transformStringToObject } from '@on/helpers';
import { QueryDto } from '@on/utils/dto/query.dto';

export class CoordinatesFilterDto {
  @ApiPropertyOptional({ description: 'Minimum latitude for property location' })
  minLat?: number;

  @ApiPropertyOptional({ description: 'Maximum latitude for property location' })
  maxLat?: number;

  @ApiPropertyOptional({ description: 'Minimum longitude for property location' })
  minLng?: number;

  @ApiPropertyOptional({ description: 'Maximum longitude for property location' })
  maxLng?: number;
}

export class QueryPropertyDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Filter by property name' })
  name?: string;

  @ApiPropertyOptional({ description: 'Filter by property host ID' })
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
  city?: string;

  @ApiPropertyOptional({ description: 'Filter by state' })
  state?: string;

  @ApiPropertyOptional({ description: 'Filter by country' })
  country?: string;

  @ApiPropertyOptional({ type: CoordinatesFilterDto, description: 'Filter by location coordinates' })
  @IsOptional()
  @ValidateNested()
  @Transform(transformStringToObject)
  @Type(() => CoordinatesFilterDto)
  coordinates?: CoordinatesFilterDto;

  @ApiPropertyOptional({ description: 'Filter by minimum number of bathrooms' })
  minBathrooms?: number;

  @ApiPropertyOptional({ description: 'Filter by minimum number of bedrooms' })
  minBedrooms?: number;

  @ApiPropertyOptional({ description: 'Filter by minimum number of kitchens' })
  minKitchens?: number;

  @ApiPropertyOptional({ description: 'Filter by property amenities (e.g., has WiFi)', isArray: true, type: String })
  amenities?: string[];

  @ApiPropertyOptional({ description: 'Filter by minimum price' })
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Filter by maximum price' })
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Filter by price details' })
  price?: {
    amount?: number;
    discountedAmount?: number;
    currency?: string;
  };

  @ApiPropertyOptional({ description: 'Filter by property features' })
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
  description?: string;

  @ApiPropertyOptional({ description: 'Filter by admin status' })
  isAdmin?: boolean;

  @ApiPropertyOptional({ description: 'Filter by number of adults' })
  adults?: number;

  @ApiPropertyOptional({ description: 'Filter by number of teenagers' })
  teenagers?: number;

  @ApiPropertyOptional({ description: 'Filter by number of kids' })
  kids?: number;

  @ApiPropertyOptional({ description: 'Filter by number of toddlers' })
  toddlers?: number;

  @ApiPropertyOptional({ description: 'Filter by number of infants' })
  infants?: number;

  @ApiPropertyOptional({ description: 'Filter by number of pets' })
  pets?: number;
}

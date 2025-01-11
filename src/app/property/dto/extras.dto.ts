import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CoordinatesDto {
  @ApiProperty({ description: 'Latitude of the property location', example: 37.7749 })
  @IsNumber()
  lat: number;

  @ApiProperty({ description: 'Longitude of the property location', example: -122.4194 })
  @IsNumber()
  lng: number;
}

export class LocationDto {
  @ApiProperty({ description: 'Address of the property', example: '123 Main Street' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'City where the property is located', example: 'San Francisco' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'State where the property is located', example: 'California' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Country where the property is located', example: 'USA' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: 'Coordinates of the property' })
  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordinates: CoordinatesDto;

  @ApiProperty({ description: 'Nearby places of interest', example: ['Shopping Mall', 'Airport'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  proximity: string[];
}

export class AccessibilityDto {
  @ApiProperty({ description: 'Accessible entrances', example: ['Wheelchair Ramp'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  entrance: string[];

  @ApiProperty({ description: 'Accessible bedrooms', example: ['Ground Floor Bedroom'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  bedrooms: string[];

  @ApiProperty({ description: 'Accessible bathrooms', example: ['Grab Bars in Bathroom'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  bathrooms: string[];
}

export class DetailsDto {
  @ApiProperty({ description: 'Number of bathrooms', example: 2 })
  @IsNumber()
  bathroom: number;

  @ApiProperty({ description: 'Number of bedrooms', example: 3 })
  @IsNumber()
  bedroom: number;

  @ApiProperty({ description: 'Number of kitchens', example: 1 })
  @IsNumber()
  kitchens: number;

  @ApiProperty({ description: 'Number of TVs', example: 2 })
  @IsNumber()
  tv: number;
}

export class OccupancyDto {
  @ApiProperty({ description: 'Number of adults', example: 2 })
  @IsNumber()
  adults: number;

  @ApiProperty({ description: 'Number of teenagers', example: 1 })
  @IsNumber()
  teenagers: number;

  @ApiProperty({ description: 'Number of kids', example: 2 })
  @IsNumber()
  kids: number;

  @ApiProperty({ description: 'Number of toddlers', example: 1 })
  @IsNumber()
  toddlers: number;

  @ApiProperty({ description: 'Number of infants', example: 1 })
  @IsNumber()
  infants: number;

  @ApiProperty({ description: 'Number of pets allowed', example: 2 })
  @IsNumber()
  pets: number;
}

export class AmenitiesDto {
  @ApiProperty({ description: 'Is WiFi available?', example: true })
  @IsBoolean()
  wifi: boolean;

  @ApiProperty({ description: 'Is there a swimming pool?', example: true })
  @IsBoolean()
  pool: boolean;

  @ApiProperty({ description: 'Is parking available?', example: true })
  @IsBoolean()
  parking: boolean;

  @ApiProperty({ description: 'Extra amenities with their availability', example: [{ gym: true }] })
  @IsArray()
  @IsOptional()
  extra: Record<string, boolean>[];
}

export class FeaturesDto {
  @ApiProperty({ description: 'Property amenities' })
  @ValidateNested()
  @Type(() => AmenitiesDto)
  amenities: AmenitiesDto;

  @ApiProperty({ description: 'Property details' })
  @ValidateNested()
  @Type(() => DetailsDto)
  details: DetailsDto;

  @ApiProperty({ description: 'Occupancy details' })
  @ValidateNested()
  @Type(() => OccupancyDto)
  occupancy: OccupancyDto;

  @ApiProperty({ description: 'Accessibility options' })
  @ValidateNested()
  @Type(() => AccessibilityDto)
  accessibility: AccessibilityDto;

  @ApiProperty({ description: 'Booking options', example: ['Instant Booking', 'Request to Book'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  bookingOptions: string[];
}

export class PriceDto {
  @ApiProperty({ description: 'Price amount', example: 200 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Discounted price', example: 180 })
  @IsNumber()
  discountedAmount: number;

  @ApiProperty({ description: 'Currency of the price', example: 'USD' })
  @IsString()
  @IsNotEmpty()
  currency: string;
}

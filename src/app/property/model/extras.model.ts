import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import {
  IAccessibility,
  IAmenities,
  ICoordinates,
  IDetails,
  IFeatures,
  ILocation,
  IOccupancy,
  IPrice,
} from '../types/property.interface';

@Schema()
export class Location implements ILocation {
  @ApiProperty()
  @Prop({ type: String, required: true })
  address: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  city: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  state: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  country: string;

  @ApiProperty()
  @Prop({ type: { lat: Number, lng: Number }, required: true })
  coordinates: ICoordinates;

  @ApiProperty()
  @Prop({ type: [String], default: [] })
  proximity: string[];
}

export const LocationSchema = SchemaFactory.createForClass(Location);

@Schema()
export class Amenities implements IAmenities {
  @ApiProperty()
  @Prop({ type: Boolean, default: false })
  wifi: boolean;

  @ApiProperty()
  @Prop({ type: Boolean, default: false })
  pool: boolean;

  @ApiProperty()
  @Prop({ type: Boolean, default: false })
  parking: boolean;

  @ApiProperty({ type: [Object], description: 'List of extra amenities with their statuses' })
  @Prop({ type: [{ name: String, value: Boolean }], default: [] })
  extra: Record<string, boolean>[];
}

export const AmenitiesSchema = SchemaFactory.createForClass(Amenities);

@Schema()
export class Details implements IDetails {
  @ApiProperty()
  @Prop({ type: Number })
  bathroom: number;

  @ApiProperty()
  @Prop({ type: Number })
  bedroom: number;

  @ApiProperty()
  @Prop({ type: Number })
  kitchens: number;

  @ApiProperty()
  @Prop({ type: Number })
  tv: number;
}

export const DetailsSchema = SchemaFactory.createForClass(Details);

@Schema()
export class Occupancy implements IOccupancy {
  @ApiProperty()
  @Prop({ type: Number })
  adults: number;

  @ApiProperty()
  @Prop({ type: Number })
  teenagers: number;

  @ApiProperty()
  @Prop({ type: Number })
  kids: number;

  @ApiProperty()
  @Prop({ type: Number })
  toddlers: number;

  @ApiProperty()
  @Prop({ type: Number })
  infants: number;

  @ApiProperty()
  @Prop({ type: Number })
  pets: number;
}

export const OccupancySchema = SchemaFactory.createForClass(Occupancy);

@Schema()
export class Features implements IFeatures {
  @ApiProperty()
  @Prop({ type: AmenitiesSchema })
  amenities: IAmenities;

  @ApiProperty()
  @Prop({ type: DetailsSchema })
  details: IDetails;

  @ApiProperty()
  @Prop({ type: OccupancySchema })
  occupancy: IOccupancy;

  @ApiProperty()
  @Prop({
    type: {
      entrance: { type: [String], default: [] },
      bedrooms: { type: [String], default: [] },
      bathrooms: { type: [String], default: [] },
    },
    required: true,
  })
  accessibility: IAccessibility;

  @ApiProperty()
  @Prop({ type: [String], default: [] })
  bookingOptions: string[];
}

export const FeaturesSchema = SchemaFactory.createForClass(Features);

@Schema()
export class Price implements IPrice {
  @ApiProperty()
  @Prop({ type: Number, required: true })
  amount: number;

  @ApiProperty()
  @Prop({ type: Number, required: false })
  discountedAmount: number;

  @ApiProperty()
  @Prop({ type: String, required: true })
  currency: string;
}

export const PriceSchema = SchemaFactory.createForClass(Price);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { IAccessibility, ICoordinates, IFeatures, ILocation, IPrice } from '../types/property.interface';

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
export class Features implements IFeatures {
  @ApiProperty()
  @Prop({ type: [String], default: [] })
  amenities: string[];

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

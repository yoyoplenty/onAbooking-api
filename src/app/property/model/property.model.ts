import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument, Types } from 'mongoose';

import { PropertyImage } from '@on/app/property-image/model/property-images.model';
import { PROPERTY_STATUS, PROPERTY_TYPE } from '@on/enums';

import { IFeatures, ILocation, IPrice, IProperty } from '../types/property.interface';

import { FeaturesSchema, LocationSchema, PriceSchema } from './extras.model';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ collection: 'properties', versionKey: false, timestamps: true })
export class Property implements IProperty {
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ type: String })
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  hostId: ObjectId;

  @ApiProperty()
  @Prop({ type: String, required: false })
  description?: string;

  @ApiProperty()
  @Prop({ enum: PROPERTY_TYPE, required: true })
  type: PROPERTY_TYPE;

  @ApiProperty()
  @Prop({ type: LocationSchema, required: true })
  location: ILocation;

  @ApiProperty()
  @Prop({ type: FeaturesSchema, required: true })
  features: IFeatures;

  @ApiProperty()
  @Prop({ type: PriceSchema, required: true })
  price: IPrice;

  @ApiProperty()
  @Prop({ enum: PROPERTY_STATUS, default: PROPERTY_STATUS.AVAILABLE })
  status: PROPERTY_STATUS;

  @ApiProperty()
  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;

  @ApiProperty()
  images: PropertyImage[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);

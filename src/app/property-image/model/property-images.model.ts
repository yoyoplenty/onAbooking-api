import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

import { Property } from '@on/app/property/model/property.model';

import { IPropertyImage } from '../types/property-image.interface';

export type PropertyImageDocument = HydratedDocument<PropertyImage>;

@Schema({ collection: 'propertyimages', versionKey: false, timestamps: true })
export class PropertyImage implements IPropertyImage {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Property' })
  propertyId: Property;

  @ApiProperty()
  @Prop({ type: String, required: true })
  imageUrl: string;
}

export const PropertyImageSchema = SchemaFactory.createForClass(PropertyImage);

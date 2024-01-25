import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

import { PropertyImage } from '@on/app/property-image/model/property-images.model';
import { PROPERTY_TYPE } from '@on/enums';

import { IProperty } from '../types/property.interface';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({ collection: 'properties', versionKey: false, timestamps: true })
export class Property implements IProperty {
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  price: number;

  @ApiProperty()
  @Prop({ type: String })
  description?: string;

  @ApiProperty()
  @Prop({ enum: PROPERTY_TYPE, required: true })
  type: PROPERTY_TYPE;

  @ApiProperty()
  images: PropertyImage[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument, Types } from 'mongoose';

import { IUnavailability } from '../types/unavailability.interface';

export type UnavailabilityDocument = HydratedDocument<Unavailability>;

@Schema({ collection: 'unavailability', versionKey: false, timestamps: true })
export class Unavailability implements IUnavailability {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Property' })
  propertyId: ObjectId;

  @ApiProperty()
  @Prop({ type: [Date] })
  dates: Date[];
}

export const UnavailabilitySchema = SchemaFactory.createForClass(Unavailability);

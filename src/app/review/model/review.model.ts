import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument, Types } from 'mongoose';

import { IReview } from '../types/review.interface';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ collection: 'reviews', versionKey: false, timestamps: true })
export class Review implements IReview {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Property', required: true })
  propertyId: ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  guestId: ObjectId;

  @ApiProperty({ example: 5, description: 'Rating for cleanliness (1-5)' })
  @Prop({ type: Number, required: true, min: 1, max: 5 })
  cleanliness: number;

  @ApiProperty({ example: 5, description: 'Rating for responsiveness (1-5)' })
  @Prop({ type: Number, required: true, min: 1, max: 5 })
  responsiveness: number;

  @ApiProperty({ example: 5, description: 'Rating for comfort (1-5)' })
  @Prop({ type: Number, required: true, min: 1, max: 5 })
  comfort: number;

  @ApiProperty({ example: 5, description: 'Rating for location accuracy (1-5)' })
  @Prop({ type: Number, required: true, min: 1, max: 5 })
  locationAccuracy: number;

  @ApiProperty()
  @Prop({ type: String, required: false })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

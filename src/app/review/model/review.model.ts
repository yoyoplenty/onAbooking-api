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

  @ApiProperty({ example: 5, description: 'Rating between 1 and 5' })
  @Prop({ type: Number, required: true, min: 1, max: 5 })
  rating: number;

  @ApiProperty()
  @Prop({ type: String, required: false })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

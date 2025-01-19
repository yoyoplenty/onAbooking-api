import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument, Types } from 'mongoose';

import { IHostReview } from '../types/host-review.interface';

export type HostReviewDocument = HydratedDocument<HostReview>;

@Schema({ collection: 'hostReviews', versionKey: false, timestamps: true })
export class HostReview implements IHostReview {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Host', required: true })
  hostId: ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  guestId: ObjectId;

  @ApiProperty({ example: 5, description: 'Rating for cleanliness (1-5)' })
  @Prop({ type: Number, required: true, min: 1, max: 5 })
  professionalism: number;

  @ApiProperty({ example: 5, description: 'Rating for responsiveness (1-5)' })
  @Prop({ type: Number, required: true, min: 1, max: 5 })
  responsiveness: number;

  @ApiProperty({ example: 5, description: 'Rating for comfort (1-5)' })
  @Prop({ type: Number, required: true, min: 1, max: 5 })
  hospitality: number;

  @ApiProperty()
  @Prop({ type: String, required: false })
  comment: string;

  @ApiProperty()
  @Prop({ type: String, required: false })
  hostComment: string;
}

export const HostReviewSchema = SchemaFactory.createForClass(HostReview);

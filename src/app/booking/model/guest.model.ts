import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { IGuest } from '../types/booking.interface';

@Schema({ _id: false })
export class Guest implements IGuest {
  @ApiProperty()
  @Prop({ required: true, type: Number, min: 0 })
  adults: number;

  @ApiProperty()
  @Prop({ required: true, type: Number, min: 0 })
  children: number;

  @ApiProperty()
  @Prop({ type: Number, min: 0, default: 0 })
  teens?: number;

  @ApiProperty()
  @Prop({ type: Number, min: 0, default: 0 })
  infants?: number;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);

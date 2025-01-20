import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { HydratedDocument, Types } from 'mongoose';

import { Property } from '@on/app/property/model/property.model';
import { User } from '@on/app/user/model/user/user.model';

import { IFavorite } from '../types/favorite.interface';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema({ collection: 'favorites', versionKey: false, timestamps: true })
export class Favorite implements IFavorite {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Property' })
  propertyId: Property | ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User | ObjectId;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

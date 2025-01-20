import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId, IsEnum } from 'class-validator';
import { ObjectId } from 'mongodb';

import { IFavorite } from '../types/favorite.interface';

export enum FavoriteType {
  ADD = 'Add',
  REMOVE = 'Remove',
}

export class ToggleFavoriteDto implements IFavorite {
  @ApiProperty({ description: 'The ID of the property related to the transaction' })
  @IsMongoId()
  @IsNotEmpty()
  propertyId: ObjectId;

  @ApiProperty({ description: 'The action type: Add or Remove' })
  @IsEnum(FavoriteType)
  @IsNotEmpty()
  type: FavoriteType;

  @ApiHideProperty()
  userId: ObjectId;
}

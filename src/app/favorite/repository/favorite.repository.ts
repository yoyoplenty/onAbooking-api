import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base.repository';

import { Favorite, FavoriteDocument } from '../model/favorite.model';

export class FavoriteRepository extends BaseRepository<FavoriteDocument> {
  constructor(@InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>) {
    super(favoriteModel);
  }
}

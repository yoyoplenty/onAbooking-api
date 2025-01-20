import { BadRequestException, Injectable } from '@nestjs/common';

import { UserDocument } from '@on/app/user/model/user/user.model';
import { ServiceResponse } from '@on/utils/types';

import { QueryFavoriteDto } from './dto/query.dto';
import { FavoriteType, ToggleFavoriteDto } from './dto/toggle.dto';
import { FavoriteRepository } from './repository/favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(private readonly favorite: FavoriteRepository) {}

  async toggle(user: UserDocument, payload: ToggleFavoriteDto): Promise<ServiceResponse> {
    const { propertyId, type } = payload;

    const userId = user._id;

    if (type === FavoriteType.ADD) {
      const existingFavorite = await this.favorite.findOne({ propertyId, userId });
      if (existingFavorite) throw new BadRequestException('Property already added to favorites');

      await this.favorite.create({ propertyId, userId });
    } else if (type === FavoriteType.REMOVE) {
      const favorite = await this.favorite.findOne({ propertyId, userId });
      if (!favorite) throw new BadRequestException('Property is not in your favorites');

      await this.favorite.deleteOne({ propertyId, userId });
    }

    return { data: null, message: `Favorites updated successfully` };
  }

  async find(filter: QueryFavoriteDto, skip?, limit?): Promise<ServiceResponse> {
    const { data, count } = await this.favorite.findAndCount(filter, { aggregate: { skip, limit } });

    const res = limit && skip ? { count, data } : data;

    return { data: res, message: `Favorites successfully fetched` };
  }
}

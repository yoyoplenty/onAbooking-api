import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { Favorite, FavoriteSchema } from './model/favorite.model';
import { FavoriteRepository } from './repository/favorite.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }])],
  controllers: [FavoriteController],
  providers: [FavoriteRepository, FavoriteService],
  exports: [FavoriteRepository, FavoriteService],
})
export class FavoriteModule {}

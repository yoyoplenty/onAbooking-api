import { Body, Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { User } from '@on/decorators/user.decorator';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { isAdmin } from '@on/helpers';
import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { UserDocument } from '../user/model/user/user.model';

import { QueryFavoriteDto } from './dto/query.dto';
import { ToggleFavoriteDto } from './dto/toggle.dto';
import { FavoriteService } from './favorite.service';
import { Favorite } from './model/favorite.model';

@ApiTags('Favorite')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Toggle Favorites',
    description: 'Allows users to toggle their favorites properties',
  })
  @ApiOkResponse({ description: 'Favorite ads successfully', type: [Favorite] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async toggleFavorites(
    @Body() payload: ToggleFavoriteDto,
    @Res() res: Response,
    @User() user: UserDocument,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.favoriteService.toggle(user, payload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get Favorites',
    description: 'Allows users get their favorites',
  })
  @ApiOkResponse({ description: 'Get favorite successful ', type: [Favorite] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findFavorites(
    @Res() res: Response,
    @Query() query: QueryFavoriteDto,
    @User() user: UserDocument,
  ): Promise<ResponseDTO> {
    try {
      const { offset, limit } = query;

      const filter = requestFilter(query);
      if (!isAdmin(user)) filter['userId'] = user._id;

      const response = await this.favoriteService.find(filter, offset, limit);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}

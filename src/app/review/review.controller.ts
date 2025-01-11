import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { Roles } from '@on/decorators/roles.decorator';
import { User } from '@on/decorators/user.decorator';
import { ROLE } from '@on/enums';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { UserDocument } from '../user/model/user.model';

import { CreateReviewDto } from './dto/create.dto';
import { QueryReviewDto } from './dto/query.dto';
import { ReviewService } from './review.service';

@ApiTags('Review')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User makes a review',
    description: 'Allows users make a property review',
  })
  @ApiOkResponse({ description: 'Review successful ', type: ApiResponseDTO })
  @Roles(ROLE.GUEST)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async review(
    @Body() reviewPayload: CreateReviewDto,
    @User() user: UserDocument,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.reviewService.create(user, reviewPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({
    summary: 'User gets a review',
    description: 'Allows users get property reviews',
  })
  @ApiOkResponse({ description: 'Review successful ', type: ApiResponseDTO })
  @Get()
  async reviews(@Query() query: QueryReviewDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.reviewService.find(query);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}

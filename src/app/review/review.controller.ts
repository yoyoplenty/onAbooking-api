import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { User } from '@on/decorators/user.decorator';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
// import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { UserDocument } from '../user/model/user.model';

import { ReviewService } from './review.service';

@ApiTags('Review')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/availabilities')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User makes a review',
    description: 'Allows users make a property review',
  })
  @ApiOkResponse({ description: 'Review successful ', type: ApiResponseDTO })
  @UseGuards(JwtAuthGuard)
  @Post()
  async Book(
    // @Body() reviewPayload: any,
    @User() user: UserDocument,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.reviewService.book(user);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}

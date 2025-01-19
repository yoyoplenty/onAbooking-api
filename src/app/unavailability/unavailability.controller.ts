import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { User } from '@on/decorators/user.decorator';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
// import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { UserDocument } from '../user/model/user/user.model';

import { UnavailabilityService } from './unavailability.service';

@ApiTags('Unavailability')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/availabilities')
export class UnavailabilityController {
  constructor(private readonly unavailabilityService: UnavailabilityService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User makes a unavailability',
    description: 'Allows users make a property unavailability',
  })
  @ApiOkResponse({ description: 'Unavailability successful ', type: ApiResponseDTO })
  @UseGuards(JwtAuthGuard)
  @Post()
  async Book(
    // @Body() unavailabilityPayload: any,
    @User() user: UserDocument,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.unavailabilityService.book(user);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}

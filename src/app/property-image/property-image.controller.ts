import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';

import { QueryPropertyImageDto } from './dto/query.dto';
import { PropertyImage } from './model/property-images.model';
import { PropertyImageService } from './property-image.service';

@ApiTags('PropertyImage')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/property_images')
export class PropertyImageController {
  constructor(private readonly propertyImageService: PropertyImageService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get property images',
    description: 'Allows admin get property images',
  })
  @ApiOkResponse({ description: 'Get property images successful ', type: [PropertyImage] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findPropertyImages(@Res() res: Response, @Query() query: QueryPropertyImageDto): Promise<ResponseDTO> {
    try {
      const filter = requestFilter(query);

      const response = await this.propertyImageService.find(filter);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}

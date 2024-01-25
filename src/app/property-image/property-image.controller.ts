import { Controller, Delete, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { Roles } from '@on/decorators/roles.decorator';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';

import { QueryPropertyImageDto } from './dto/query.dto';
import { PropertyImage } from './model/property-images.model';
import { PropertyImageService } from './property-image.service';

@ApiTags('PropertyImage')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Roles('admin')
@UseGuards(JwtAuthGuard, RoleGuard)
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

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete property images',
    description: 'Allows admin delete property images',
  })
  @ApiOkResponse({ description: 'property images deleted successfully', type: [PropertyImage] })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePropertyImage(@Param('id') id: string, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.propertyImageService.delete(id);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}

import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { FormDataRequest } from 'nestjs-form-data';

import { Roles } from '@on/decorators/roles.decorator';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';

import { CreatePropertyDto } from './dto/create.dto';
import { QueryPropertyDto } from './dto/query.dto';
import { Property } from './model/property.model';
import { PropertyService } from './property.service';

@ApiTags('Property')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Roles('admin')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('api/v1/properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin uploads property',
    description: 'Allows admin uploads property',
  })
  @ApiOkResponse({ description: 'Property creation successful ', type: ApiResponseDTO })
  @ApiConsumes('multipart/form-data')
  @FormDataRequest()
  @Post()
  async createProperty(@Body() createPropertyPayload: CreatePropertyDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.propertyService.create(createPropertyPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get properties',
    description: 'Allows admin get properties',
  })
  @ApiOkResponse({ description: 'Get properties successful ', type: [Property] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findProperties(@Res() res: Response, @Query() query: QueryPropertyDto): Promise<ResponseDTO> {
    try {
      const filter = requestFilter(query);

      const response = await this.propertyService.find(filter);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}

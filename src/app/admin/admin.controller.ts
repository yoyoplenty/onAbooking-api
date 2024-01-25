import { Body, Controller, Get, Param, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { Roles } from '@on/decorators/roles.decorator';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { QueryBookingDto } from '../booking/dto/query.dto';
import { Booking } from '../booking/model/booking.model';

import { AdminService } from './admin.service';
import { PropertyAvailabilityDto } from './dto/property/availability.dto';

@ApiTags('Admin')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin gets bookings',
    description: 'Allows admin get bookings',
  })
  @ApiOkResponse({ description: 'Get bookings successful ', type: [Booking] })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('bookings')
  async findBookings(@Res() res: Response, @Query() query: QueryBookingDto): Promise<ResponseDTO> {
    try {
      const { offset, limit } = query;

      const filter = requestFilter(query);

      const response = await this.adminService.findBookings(filter, offset, limit);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin updates property availability',
    description: 'Allows admin updates property availability',
  })
  @ApiOkResponse({ description: 'Property updated successfully', type: ApiResponseDTO })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('property-availability/:propertyId')
  async managePropertyAvailability(
    @Body() availabilityPayload: PropertyAvailabilityDto,
    @Param('propertyId') id: string,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.adminService.managePropertyAvailability(id, availabilityPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { User } from '@on/decorators/user.decorator';
import { ErrorResponse, JsonResponse } from '@on/handlers/response';
import { requestFilter } from '@on/helpers/request-filter';
import { ApiResponseDTO } from '@on/utils/dto/response.dto';
import { ResponseDTO } from '@on/utils/types';

import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { UserDocument } from '../user/model/user/user.model';

import { BookingService } from './booking.service';
import { BookingDto } from './dto/book.dto';
import { QueryBookingDto } from './dto/query.dto';
import { UpdateBookingDto } from './dto/update.dto';
import { Booking } from './model/booking.model';

@ApiTags('Booking')
@ApiUnprocessableEntityResponse({ status: 422, description: 'Error occurred', type: ApiResponseDTO })
@Controller('api/v1/bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User makes a booking',
    description: 'Allows users make a property booking',
  })
  @ApiOkResponse({ description: 'Booking successful ', type: ApiResponseDTO })
  @UseGuards(JwtAuthGuard)
  @Post()
  async Book(
    @Body() bookingPayload: BookingDto,
    @User() user: UserDocument,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.bookingService.book(user, bookingPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Verify Booking Payment',
    description: 'Allows users verify booking payment',
  })
  @ApiOkResponse({ description: 'Verify booking successful ', type: ApiResponseDTO })
  @Get('payment-verification/:reference')
  async findTransactions(@Param('reference') reference: string, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.bookingService.verifyBooking(reference);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User gets his/her bookings',
    description: 'Allows users get bookings',
  })
  @ApiOkResponse({ description: 'Get bookings successful ', type: [Booking] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findBookings(
    @Res() res: Response,
    @User() user: UserDocument,
    @Query() query: QueryBookingDto,
  ): Promise<ResponseDTO> {
    try {
      const { offset, limit } = query;

      const filter = requestFilter(query);
      filter['userId'] = user._id;

      const response = await this.bookingService.find(filter, offset, limit);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User updates booking',
    description: 'Allows admin updates booking',
  })
  @ApiOkResponse({ description: 'Booking updated successfully', type: ApiResponseDTO })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateBooking(
    @Body() updateBookingPayload: UpdateBookingDto,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.bookingService.update(id, updateBookingPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User delete booking',
    description: 'Allows admin deletes booking',
  })
  @ApiOkResponse({ description: 'Booking deletion successful ', type: ApiResponseDTO })
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteBooking(@Param('id') id: string, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.bookingService.delete(id);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}

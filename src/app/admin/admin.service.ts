import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ServiceResponse } from '@on/utils/types';

import { BookingService } from '../booking/booking.service';
import { QueryBookingDto } from '../booking/dto/query.dto';
import { PropertyRepository } from '../property/repository/property.repository';

import { PropertyAvailabilityDto } from './dto/property/availability.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly property: PropertyRepository,
    private readonly booking: BookingService,
  ) {}

  async managePropertyAvailability(
    id: ObjectId | string,
    availabilityPayload: PropertyAvailabilityDto,
  ): Promise<ServiceResponse> {
    const property = await this.property.findById(new ObjectId(id));
    if (!property) throw new NotFoundException('property not found');

    const data = await this.property.updateById(new ObjectId(id), availabilityPayload);

    return { data, message: `Property availability successfully updated` };
  }

  async findBookings(filter: QueryBookingDto, skip?, limit?): Promise<ServiceResponse> {
    return await this.booking.find(filter, skip, limit);
  }
}

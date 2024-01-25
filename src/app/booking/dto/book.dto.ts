import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsDateString } from 'class-validator';
import { ObjectId } from 'mongodb';

import { IBooking } from '../types/booking.interface';

export class BookingDto implements IBooking {
  @ApiProperty({ description: 'The property ID', type: String, format: 'ObjectId' })
  @IsMongoId()
  @IsNotEmpty()
  propertyId: ObjectId;

  @ApiProperty({ description: 'The check-in date', type: String, format: 'date' })
  @IsDateString()
  @IsNotEmpty()
  checkIn: Date;

  @ApiProperty({ description: 'The check-in date', type: String, format: 'date' })
  @IsDateString()
  @IsNotEmpty()
  checkOut: Date;
}

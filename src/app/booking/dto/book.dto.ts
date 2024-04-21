import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator';
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

  @ApiProperty({ description: 'The total no of adults to be present', type: Number })
  @IsNumber()
  @IsOptional()
  adultNo: number;

  @ApiProperty({ description: 'The total no of children to be present', type: Number })
  @IsNumber()
  @IsOptional()
  childNo: number;

  @ApiHideProperty()
  isPaid: boolean;

  @ApiHideProperty()
  paymentRef: string;
}

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsDateString, IsNumber, IsOptional, IsInt, Min, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';

import { BOOKING_STATUS, PAYMENT_STATUS } from '@on/enums';

import { IBooking, IGuest } from '../types/booking.interface';

export class GuestDto {
  @ApiProperty({ description: 'Number of adults in the booking', example: 2 })
  @IsInt()
  @Min(1, { message: 'At least one adult is required for a booking.' })
  @IsNotEmpty()
  adults: number;

  @ApiProperty({ description: 'Number of children in the booking', example: 1 })
  @IsInt()
  @Min(0, { message: 'Children count cannot be negative.' })
  @IsNotEmpty()
  children: number;

  @ApiProperty({ description: 'Number of teenagers in the booking (optional)', example: 1 })
  @IsInt()
  @Min(0, { message: 'Teen count cannot be negative.' })
  @IsOptional()
  teens?: number;

  @ApiProperty({ description: 'Number of infants in the booking (optional)', example: 1 })
  @IsInt()
  @Min(0, { message: 'Infant count cannot be negative.' })
  @IsOptional()
  infants?: number;
}

export class BookingDto implements IBooking {
  @ApiProperty({ description: 'The property ID', type: String, format: 'ObjectId' })
  @IsMongoId()
  @IsNotEmpty()
  propertyId: ObjectId;

  @ApiProperty({ description: 'Details of the guest(s) making the booking', type: GuestDto })
  @ValidateNested()
  @Type(() => GuestDto)
  @IsNotEmpty()
  guest: IGuest;

  @ApiProperty({ description: 'Price of the booking', example: 500.0 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ description: 'The check-in date', type: String, format: 'date' })
  @IsDateString()
  @IsNotEmpty()
  checkIn: Date;

  @ApiProperty({ description: 'The check-in date', type: String, format: 'date' })
  @IsDateString()
  @IsNotEmpty()
  checkOut: Date;

  @ApiHideProperty()
  paymentRef: string;

  @ApiHideProperty()
  reference: string;

  @ApiHideProperty()
  status: BOOKING_STATUS;

  @ApiHideProperty()
  paymentStatus: PAYMENT_STATUS;

  @ApiHideProperty()
  guestId: ObjectId;

  @ApiHideProperty()
  paymentUrl: string;
}

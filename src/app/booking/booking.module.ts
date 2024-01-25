import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PropertyModule } from '../property/property.module';

import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from './model/booking.model';
import { BookingRepository } from './repository/booking.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]), PropertyModule],
  controllers: [BookingController],
  providers: [BookingRepository, BookingService],
  exports: [BookingRepository, BookingService],
})
export class BookingModule {}

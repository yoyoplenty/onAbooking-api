import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaystackService } from '@on/services/payment/paystack';

import { PropertyModule } from '../property/property.module';
import { TransactionModule } from '../transaction/transaction.module';

import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from './model/booking.model';
import { BookingRepository } from './repository/booking.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    PropertyModule,
    TransactionModule,
  ],
  controllers: [BookingController],
  providers: [BookingRepository, BookingService, PaystackService],
  exports: [BookingRepository, BookingService],
})
export class BookingModule {}

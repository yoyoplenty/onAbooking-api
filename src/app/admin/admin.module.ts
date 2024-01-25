import { Module } from '@nestjs/common';

import { BookingModule } from '../booking/booking.module';
import { PropertyModule } from '../property/property.module';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [BookingModule, PropertyModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

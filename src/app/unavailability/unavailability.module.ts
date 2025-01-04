import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PropertyModule } from '../property/property.module';

import { Unavailability, UnavailabilitySchema } from './model/unavailability.model';
import { UnavailabilityRepository } from './repository/unavailability.repository';
import { UnavailabilityController } from './unavailability.controller';
import { UnavailabilityService } from './unavailability.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Unavailability.name, schema: UnavailabilitySchema }]), PropertyModule],
  controllers: [UnavailabilityController],
  providers: [UnavailabilityRepository, UnavailabilityService],
  exports: [UnavailabilityRepository, UnavailabilityService],
})
export class UnavailabilityModule {}

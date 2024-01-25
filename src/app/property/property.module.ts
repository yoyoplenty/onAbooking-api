import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NestjsFormDataModule } from 'nestjs-form-data';

import { CloudinaryService } from '@on/services/cloudinary/service';

import { PropertyImageModule } from '../property-image/property-image.module';

import { Property, PropertySchema } from './model/property.model';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyRepository } from './repository/property.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }]),
    NestjsFormDataModule,
    PropertyImageModule,
  ],
  controllers: [PropertyController],
  providers: [PropertyRepository, PropertyService, CloudinaryService],
  exports: [PropertyRepository, PropertyService],
})
export class PropertyModule {}

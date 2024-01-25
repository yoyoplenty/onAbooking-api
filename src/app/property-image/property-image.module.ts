import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PropertyImage, PropertyImageSchema } from './model/property-images.model';
import { PropertyImageController } from './property-image.controller';
import { PropertyImageService } from './property-image.service';
import { PropertyImageRepository } from './repository/property-image.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: PropertyImage.name, schema: PropertyImageSchema }])],
  controllers: [PropertyImageController],
  providers: [PropertyImageRepository, PropertyImageService],
  exports: [PropertyImageRepository, PropertyImageService],
})
export class PropertyImageModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Property, PropertySchema } from './model/property.model';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyRepository } from './repository/property.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }])],
  controllers: [PropertyController],
  providers: [PropertyRepository, PropertyService],
  exports: [PropertyRepository, PropertyService],
})
export class PropertyModule {}

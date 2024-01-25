import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { ServiceResponse } from '@on/utils/types';

import { QueryPropertyImageDto } from './dto/query.dto';
import { PropertyImageRepository } from './repository/property-image.repository';

@Injectable()
export class PropertyImageService {
  constructor(private readonly propertyImage: PropertyImageRepository) {}

  async find(filter: QueryPropertyImageDto): Promise<ServiceResponse> {
    const data = await this.propertyImage.find(filter, [{ path: 'propertyId' }]);

    return { data, message: `Properties successfully fetched` };
  }

  async delete(id: ObjectId | string): Promise<ServiceResponse> {
    const propertyImage = await this.propertyImage.findById(new ObjectId(id));
    if (propertyImage) throw new NotFoundException('property image not found');

    await this.propertyImage.deleteById(new ObjectId(id));

    return { data: null, message: 'Property image deleted successfully' };
  }
}

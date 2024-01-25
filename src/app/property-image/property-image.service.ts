import { Injectable } from '@nestjs/common';

import { ServiceResponse } from '@on/utils/types';

import { regexSearchQuery } from '../../helpers/search-query';

import { QueryPropertyImageDto } from './dto/query.dto';
import { PropertyImageRepository } from './repository/property-image.repository';

@Injectable()
export class PropertyImageService {
  constructor(private readonly propertyImage: PropertyImageRepository) {}

  async find(query: QueryPropertyImageDto): Promise<ServiceResponse> {
    const searchFields = ['email', 'firstName', 'lastName'];
    const filter = query.search ? regexSearchQuery(searchFields, query.search, query) : query;

    const data = await this.propertyImage.find(filter);

    return { data, message: `Properties successfully fetched` };
  }
}

import { Injectable } from '@nestjs/common';

import { ServiceResponse } from '@on/utils/types';

import { regexSearchQuery } from '../../helpers/search-query';

import { QueryPropertyDto } from './dto/query.dto';
import { PropertyRepository } from './repository/property.repository';

@Injectable()
export class PropertyService {
  constructor(private readonly property: PropertyRepository) {}

  async find(query: QueryPropertyDto): Promise<ServiceResponse> {
    const searchFields = ['email', 'firstName', 'lastName'];
    const filter = query.search ? regexSearchQuery(searchFields, query.search, query) : query;

    const data = await this.property.find(filter);

    return { data, message: `Properties successfully fetched` };
  }
}

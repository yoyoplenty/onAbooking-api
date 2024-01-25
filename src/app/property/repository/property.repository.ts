import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base';

import { Property, PropertyDocument } from '../model/property.model';

export class PropertyRepository extends BaseRepository<PropertyDocument> {
  constructor(@InjectModel(Property.name) private propertyModel: Model<PropertyDocument>) {
    super(propertyModel);
  }
}

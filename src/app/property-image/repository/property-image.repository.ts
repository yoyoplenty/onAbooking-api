import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base.repository';

import { PropertyImage, PropertyImageDocument } from '../model/property-images.model';

export class PropertyImageRepository extends BaseRepository<PropertyImageDocument> {
  constructor(@InjectModel(PropertyImage.name) private propertyImageModel: Model<PropertyImageDocument>) {
    super(propertyImageModel);
  }
}

import { ObjectId } from 'mongodb';

import { Property } from '@on/app/property/model/property.model';
import { IBaseType } from '@on/utils/types';

export interface IPropertyImage extends IBaseType {
  propertyId: ObjectId | Property;
  imageUrl: string;
}

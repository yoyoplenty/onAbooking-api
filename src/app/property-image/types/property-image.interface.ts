import { ObjectId } from 'mongodb';

import { Property } from '@on/app/property/model/property.model';
import { PROPERTY_FILE_TYPE } from '@on/enums';
import { IBaseType } from '@on/utils/types';

export interface IPropertyImage extends IBaseType {
  propertyId: ObjectId | Property;
  url: string;
  placement: string;
  type: PROPERTY_FILE_TYPE;
}

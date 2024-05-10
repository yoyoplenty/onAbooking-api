import { PropertyImage } from '@on/app/property-image/model/property-images.model';
import { LOCATION_TYPE, PROPERTY_STATUS, PROPERTY_TYPE } from '@on/enums';
import { IBaseType } from '@on/utils/types';

export interface IProperty extends IBaseType {
  name: string;
  price: number;
  location: LOCATION_TYPE;
  address: string;
  description?: string;
  type: PROPERTY_TYPE;
  status: PROPERTY_STATUS;
  images: PropertyImage[];
}

import { PropertyImage } from '@on/app/property-image/model/property-images.model';
import { PROPERTY_STATUS, PROPERTY_TYPE } from '@on/enums';
import { IBaseType } from '@on/utils/types';

export interface IProperty extends IBaseType {
  name: string;
  price: number;
  description?: string;
  type: PROPERTY_TYPE;
  status: PROPERTY_STATUS;
  images: PropertyImage[];
}

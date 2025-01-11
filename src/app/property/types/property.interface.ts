import { ObjectId } from 'mongodb';

import { PropertyImage } from '@on/app/property-image/model/property-images.model';
import { PROPERTY_STATUS, PROPERTY_TYPE } from '@on/enums';
import { IBaseType } from '@on/utils/types';

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface ILocation {
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates: ICoordinates;
  proximity: string[];
}

export interface IAccessibility {
  entrance: string[];
  bedrooms: string[];
  bathrooms: string[];
}

export interface IDetails {
  bathroom: number;
  bedroom: number;
  kitchens: number;
  tv: number;
}

export interface IOccupancy {
  adults: number;
  teenagers: number;
  kids: number;
  toddlers: number;
  infants: number;
  pets: number;
}

export interface IAmenities {
  wifi: boolean;
  pool: boolean;
  parking: boolean;
  extra: Record<string, boolean>[];
}

export interface IFeatures {
  amenities: IAmenities;
  details: IDetails;
  occupancy: IOccupancy;
  accessibility: IAccessibility;
  bookingOptions: string[];
}

export interface IPrice {
  amount: number;
  discountedAmount: number;
  currency: string;
}

export interface IProperty extends IBaseType {
  name: string;
  hostId: ObjectId;
  description?: string;
  type: PROPERTY_TYPE;
  location: ILocation;
  features: IFeatures;
  price: IPrice;
  isAdmin: boolean;
  status: PROPERTY_STATUS;
  images: PropertyImage[];
}

import { ObjectId } from 'mongodb';

export interface ServiceResponse<T extends object | object[] | null = any> {
  data: T;
  message: string;
}

export interface ResponseDTO {
  success: boolean;
  data: null | object;
  message: string;
}

export interface IBaseType {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AggregateOption {
  limit?: number;
  skip?: number;
}

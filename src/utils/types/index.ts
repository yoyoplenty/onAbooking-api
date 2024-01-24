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

export interface IBaseModel {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

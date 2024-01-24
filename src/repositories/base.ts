import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

type GenericRecord = Record<string, any> | any;

export class BaseRepository<T> {
  constructor(private readonly repository: Model<T>) {}

  async find(query?: GenericRecord): Promise<T[]> {
    return await this.repository.find(query);
  }

  async findOne(query: GenericRecord): Promise<T> {
    return await this.repository.findOne(query);
  }

  async findById(id: ObjectId): Promise<T> {
    return await this.repository.findById(id);
  }

  async aggregate(query: any): Promise<T[]> {
    return await this.repository.aggregate(query);
  }
}

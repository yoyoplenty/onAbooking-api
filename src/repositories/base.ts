import { ObjectId } from 'mongodb';
import { Model, PopulateOptions } from 'mongoose';

type GenericRecord = Record<string, any> | any;

export class BaseRepository<T> {
  constructor(private readonly repository: Model<T>) {}

  // async find(query?: GenericRecord): Promise<T[]> {
  //   return await this.repository.find(query);
  // }

  async find(query?: GenericRecord, populateOptions?: PopulateOptions[]): Promise<T[]> {
    let queryBuilder: any = this.repository.find(query);

    if (populateOptions) {
      queryBuilder = queryBuilder.populate(populateOptions);
    }

    return await queryBuilder.exec();
  }

  async findOne(query: GenericRecord): Promise<T> {
    return await this.repository.findOne(query);
  }

  async findById(id: ObjectId): Promise<T> {
    return await this.repository.findById(id);
  }

  async create(payload: GenericRecord): Promise<T> {
    return await this.repository.create(payload);
  }

  async createMany(payload: GenericRecord[]): Promise<T[]> {
    return await this.repository.insertMany(payload);
  }

  async aggregate(query: any): Promise<T[]> {
    return await this.repository.aggregate(query);
  }
}

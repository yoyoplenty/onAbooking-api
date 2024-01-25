import { ObjectId } from 'mongodb';
import { Model, PopulateOptions } from 'mongoose';

import { AggregateOption } from '@on/utils/types';

type GenericRecord = Record<string, any> | any;

export class BaseRepository<T> {
  constructor(private readonly repository: Model<T>) {}

  async find(query?: GenericRecord, populateOptions?: PopulateOptions[]): Promise<T[]> {
    return await this.queryBuilder(query, populateOptions).exec();
  }

  async findOne(query: GenericRecord, populateOptions?: PopulateOptions[]): Promise<T> {
    let queryBuilder: any = this.repository.findOne(query);

    if (populateOptions) queryBuilder = queryBuilder.populate(populateOptions);

    return await queryBuilder.exec();
  }

  async findById(id: ObjectId, populateOptions?: PopulateOptions[]): Promise<T> {
    let queryBuilder: any = this.repository.findById(id);

    if (populateOptions) queryBuilder = queryBuilder.populate(populateOptions);

    return await queryBuilder.exec();
  }

  async findAndCount(
    query: GenericRecord,
    options: AggregateOption,
    populateOptions?: PopulateOptions[],
  ): Promise<{ data: T[]; count: number }> {
    const queryBuilder = this.queryBuilder(query, populateOptions);

    const data = await queryBuilder.skip(options.skip).limit(options.limit).exec();
    const count = await queryBuilder.countDocuments().exec();

    return { data, count };
  }

  async aggregate(query: any, options?: AggregateOption): Promise<T[]> {
    const aggregationPipeline: any[] = query;

    if (options && options.limit !== undefined) aggregationPipeline.push({ $limit: options.limit });

    if (options && options.skip !== undefined) aggregationPipeline.push({ $skip: options.skip });

    return await this.repository.aggregate(aggregationPipeline).exec();
  }

  async aggregateAndCount(query: any[], options?: AggregateOption): Promise<{ data: T[]; count: number }> {
    const aggregationPipeline: any[] = query || [];

    let matchStage: any;

    if (options && options.limit !== undefined) aggregationPipeline.push({ $limit: Number(options.limit) });

    if (options && options.skip !== undefined) aggregationPipeline.push({ $skip: Number(options.skip) });

    for (const stage of aggregationPipeline) {
      if (stage && stage.$match) {
        matchStage = stage.$match;
        break;
      }
    }

    const [data, count] = await Promise.all([
      this.repository.aggregate(aggregationPipeline).exec(),
      this.repository.countDocuments(matchStage || {}).exec(),
    ]);

    return { data, count };
  }

  async create(payload: GenericRecord): Promise<T> {
    return await this.repository.create(payload);
  }

  async createMany(payload: GenericRecord[]): Promise<T[]> {
    return await this.repository.insertMany(payload);
  }

  async updateOne(query: GenericRecord, update: GenericRecord): Promise<T | null> {
    return await this.repository.findOneAndUpdate(query, update, { new: true }).exec();
  }

  async updateById(id: ObjectId, update: GenericRecord): Promise<T | null> {
    return await this.repository.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteOne(query: GenericRecord): Promise<void> {
    await this.repository.deleteOne(query).exec();
  }

  async deleteById(id: ObjectId): Promise<void> {
    await this.repository.findByIdAndDelete(id).exec();
  }

  async deleteMany(query: GenericRecord): Promise<void> {
    await this.repository.deleteMany(query);
  }

  private queryBuilder(query: GenericRecord = {}, populateOptions?: PopulateOptions[]): any {
    let queryBuilder: any = this.repository.find(query);

    if (populateOptions) queryBuilder = queryBuilder.populate(populateOptions);

    queryBuilder = queryBuilder.sort({ createdAt: -1 });

    return queryBuilder;
  }
}

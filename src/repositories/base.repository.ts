import { ObjectId } from 'mongodb';
import { Model, PopulateOptions } from 'mongoose';

import { AggregateOption } from '@on/utils/types';

type GenericRecord = Record<string, any> | any;

export class BaseRepository<T> {
  constructor(private readonly repository: Model<T>) {}

  async find(
    query?: GenericRecord,
    populateOptions?: PopulateOptions[],
    sortOptions?: { field: string; direction: number },
  ): Promise<T[]> {
    return await this.queryBuilder(query, populateOptions, sortOptions).exec();
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
    const dataQueryBuilder = this.queryBuilder(query, populateOptions);
    const countQueryBuilder = this.repository.find(query);

    const [data, count] = await Promise.all([
      dataQueryBuilder
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .exec(),
      countQueryBuilder.countDocuments().exec(),
    ]);

    return { data, count };
  }

  async aggregate(query: any, options?: AggregateOption): Promise<T[]> {
    const aggregationPipeline: any[] = query;

    if (options && options.limit !== undefined) aggregationPipeline.push({ $limit: Number(options.limit) });

    if (options && options.skip !== undefined) aggregationPipeline.push({ $skip: Number(options.skip) });

    return await this.repository.aggregate(aggregationPipeline).exec();
  }

  async aggregateAndCount(query: any[], options?: AggregateOption): Promise<{ data: T[]; count: number }> {
    const aggregationPipeline: any[] = query || [];

    if (options && options.limit !== undefined) aggregationPipeline.push({ $limit: Number(options.limit) });

    if (options && options.skip !== undefined) aggregationPipeline.push({ $skip: Number(options.skip) });

    const countPipeline = [...aggregationPipeline];
    const count = await this.repository.aggregate(countPipeline.concat({ $count: 'count' })).exec();

    const dataPipeline = [...aggregationPipeline, { $limit: count[0]?.count || 0 }];
    const data = await this.repository.aggregate(dataPipeline).exec();

    return { data, count: count[0]?.count || 0 };
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

  private queryBuilder(
    query: GenericRecord = {},
    populateOptions?: PopulateOptions[],
    sortOptions?: { field: string; direction: number },
  ): any {
    let queryBuilder: any = this.repository.find(query);

    if (populateOptions) queryBuilder = queryBuilder.populate(populateOptions);

    const defaultSortOptions = { field: 'createdAt', direction: -1 };
    const finalSortOptions = sortOptions || defaultSortOptions;

    queryBuilder = queryBuilder.sort({ [finalSortOptions.field]: finalSortOptions.direction });

    return queryBuilder;
  }
}

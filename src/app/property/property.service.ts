import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { parseJSONStringValues } from '@on/helpers';
import { CloudinaryService } from '@on/services/cloudinary/service';
import { ServiceResponse } from '@on/utils/types';

import { PropertyImageRepository } from '../property-image/repository/property-image.repository';

import { UserDocument } from './../user/model/user.model';
import { CreatePropertyDto } from './dto/create.dto';
import { QueryPropertyDto } from './dto/query.dto';
import { UpdatePropertyDto } from './dto/update.dto';
import { averageRatingAggregation } from './helper/aggregation';
import { PropertyRepository } from './repository/property.repository';

@Injectable()
export class PropertyService {
  constructor(
    private readonly property: PropertyRepository,
    private readonly cloudinary: CloudinaryService,
    private readonly propertyImage: PropertyImageRepository,
  ) {}

  public async create(user: UserDocument, payload: CreatePropertyDto): Promise<ServiceResponse> {
    const { files = null, name } = payload;

    const images = files && Array.isArray(files) ? [...files] : [files];

    const propertyExist = await this.property.findOne({ name, hostId: user._id });
    if (propertyExist) throw new ConflictException('property with name exists for host');

    const parsedPayload = parseJSONStringValues(payload);

    const imageUrls = await this.cloudinary.uploadImages(images);

    const propertyPayload = {
      ...parsedPayload,
      hostId: user._id,
    };

    const property = await this.property.create(propertyPayload);

    const propertyImageDocuments = imageUrls.map((imageUrl) => ({
      propertyId: property._id,
      imageUrl,
    }));

    await this.propertyImage.createMany(propertyImageDocuments);

    return { data: property, message: `Properties successfully created` };
  }

  public async find(filter: QueryPropertyDto, skip?: number, limit?: number): Promise<ServiceResponse> {
    const data = await this.property.aggregateAndCount(
      [
        { $match: filter },
        { $lookup: { from: 'propertyimages', localField: '_id', foreignField: 'propertyId', as: 'images' } },
        { $lookup: { from: 'reviews', localField: '_id', foreignField: 'propertyId', as: 'reviews' } },
        { $addFields: { averageRating: averageRatingAggregation() } },
        { $sort: { averageRating: -1 } },
        { $skip: skip || 0 },
        { $limit: limit || 10 },
      ],
      { aggregate: { skip, limit } },
    );

    return { data, message: `Properties successfully fetched` };
  }

  public async update(id: ObjectId | string, updatePropertyPayload: UpdatePropertyDto): Promise<ServiceResponse> {
    const { files = null } = updatePropertyPayload;

    const images = files && Array.isArray(files) ? [...files] : [files];

    const propertyExist = await this.property.findById(new ObjectId(id));
    if (!propertyExist) throw new NotFoundException('property not found');

    const property = await this.property.updateById(new ObjectId(id), updatePropertyPayload);

    if (files) {
      const imageUrls = await this.cloudinary.uploadImages(images);

      const propertyImageDocuments = imageUrls.map((imageUrl) => ({
        propertyId: property._id,
        imageUrl,
      }));

      await this.propertyImage.createMany(propertyImageDocuments);
    }

    return { data: property, message: `Properties successfully updated` };
  }

  public async delete(id: ObjectId | string): Promise<ServiceResponse> {
    const property = await this.property.findById(new ObjectId(id));
    if (!property) throw new NotFoundException('property not found');

    await this.property.deleteById(new ObjectId(id));
    await this.propertyImage.deleteMany({ propertyId: new ObjectId(id) });

    return { data: null, message: 'Property deleted successfully' };
  }
}

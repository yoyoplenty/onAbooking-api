import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { CloudinaryService } from '@on/services/cloudinary/service';
import { ServiceResponse } from '@on/utils/types';

import { PropertyImageRepository } from '../property-image/repository/property-image.repository';

import { CreatePropertyDto } from './dto/create.dto';
import { QueryPropertyDto } from './dto/query.dto';
import { UpdatePropertyDto } from './dto/update.dto';
import { PropertyRepository } from './repository/property.repository';

@Injectable()
export class PropertyService {
  constructor(
    private readonly property: PropertyRepository,
    private readonly cloudinary: CloudinaryService,
    private readonly propertyImage: PropertyImageRepository,
  ) {}

  async create(createPropertyPayload: CreatePropertyDto): Promise<ServiceResponse> {
    const { files = null, name } = createPropertyPayload;

    const images = files && Array.isArray(files) ? [...files] : [files];

    const propertyExist = await this.property.findOne({ name });
    if (propertyExist) throw new ConflictException('property with name exists');

    const imageUrls = await this.cloudinary.uploadImages(images);

    const property = await this.property.create(createPropertyPayload);

    const propertyImageDocuments = imageUrls.map((imageUrl) => ({
      propertyId: property._id,
      imageUrl,
    }));

    await this.propertyImage.createMany(propertyImageDocuments);

    return { data: property, message: `Properties successfully created` };
  }

  async find(filter: QueryPropertyDto, skip?, limit?): Promise<ServiceResponse> {
    const data = await this.property.aggregateAndCount(
      [
        { $match: filter },
        {
          $lookup: {
            from: 'propertyimages',
            localField: '_id',
            foreignField: 'propertyId',
            as: 'images',
          },
        },
      ],
      { skip, limit },
    );

    return { data, message: `Properties successfully fetched` };
  }

  async update(id: ObjectId | string, updatePropertyPayload: UpdatePropertyDto): Promise<ServiceResponse> {
    const { files = null } = updatePropertyPayload;

    const images = files && Array.isArray(files) ? [...files] : [files];

    const propertyExist = await this.property.findById(new ObjectId(id));
    if (!propertyExist) throw new NotFoundException('property not found');

    const imageUrls = await this.cloudinary.uploadImages(images);

    const property = await this.property.updateById(new ObjectId(id), updatePropertyPayload);

    const propertyImageDocuments = imageUrls.map((imageUrl) => ({
      propertyId: property._id,
      imageUrl,
    }));

    await this.propertyImage.createMany(propertyImageDocuments);

    return { data: property, message: `Properties successfully updated` };
  }

  async delete(id: ObjectId | string): Promise<ServiceResponse> {
    const property = await this.property.findById(new ObjectId(id));
    if (property) throw new NotFoundException('property not found');

    await this.property.deleteById(new ObjectId(id));

    return { data: null, message: 'Property deleted successfully' };
  }
}

import { ConflictException, Injectable } from '@nestjs/common';

import { CloudinaryService } from '@on/services/cloudinary/service';
import { ServiceResponse } from '@on/utils/types';

import { regexSearchQuery } from '../../helpers/search-query';
import { PropertyImageRepository } from '../property-image/repository/property-image.repository';

import { CreatePropertyDto } from './dto/create.dto';
import { QueryPropertyDto } from './dto/query.dto';
import { PropertyRepository } from './repository/property.repository';

@Injectable()
export class PropertyService {
  constructor(
    private readonly property: PropertyRepository,
    private readonly cloudinary: CloudinaryService,
    private readonly propertyImage: PropertyImageRepository,
  ) {}

  async create(createPropertyPayload: CreatePropertyDto): Promise<ServiceResponse> {
    const { files, name } = createPropertyPayload;

    const images = Array.isArray(files) ? [...files] : [files];

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

  async find(query: QueryPropertyDto): Promise<ServiceResponse> {
    const searchFields = ['name', 'price', 'type'];
    const filter = query.search ? regexSearchQuery(searchFields, query.search, query) : query;

    // const data = await this.property.find(filter);

    const data = await this.property.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'propertyimages',
          localField: '_id',
          foreignField: 'propertyId',
          as: 'images',
        },
      },
    ]);

    return { data, message: `Properties successfully fetched` };
  }
}

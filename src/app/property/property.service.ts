import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { parseJSONStringValues } from '@on/helpers';
import { CloudinaryService } from '@on/services/cloudinary/service';
import { ServiceResponse } from '@on/utils/types';

import { getFileType } from '../property-image/helper';
import { PropertyImageRepository } from '../property-image/repository/property-image.repository';

import { UserDocument } from './../user/model/user/user.model';
import { CreatePropertyDto } from './dto/create.dto';
import { QueryPropertyDto } from './dto/query.dto';
import { UpdatePropertyDto } from './dto/update.dto';
import { getPropertyAggregationPipeline } from './helper/aggregation';
import { PropertyRepository } from './repository/property.repository';

@Injectable()
export class PropertyService {
  constructor(
    private readonly property: PropertyRepository,
    private readonly cloudinary: CloudinaryService,
    private readonly propertyImage: PropertyImageRepository,
  ) {}

  public async create(user: UserDocument, payload: CreatePropertyDto): Promise<ServiceResponse> {
    const { files, name } = payload;

    if (!files.length) throw new BadRequestException('No files uploaded.');

    const propertyExist = await this.property.findOne({ name, hostId: user._id });
    if (propertyExist) throw new ConflictException('property with name exists for host');

    const parsedPayload = parseJSONStringValues(payload);
    const uploadedFiles = await this.processFiles(files);

    const propertyPayload = {
      ...parsedPayload,
      hostId: user._id,
    };

    console.log(uploadedFiles);

    const property = await this.property.create(propertyPayload);

    await this.savePropertyImages(property._id, uploadedFiles);

    return { data: property, message: `Properties successfully created` };
  }

  public async find(filter: QueryPropertyDto, skip?: number, limit?: number): Promise<ServiceResponse> {
    const pipeline = getPropertyAggregationPipeline(filter, skip, limit);

    const data = await this.property.aggregateAndCount(pipeline, {
      aggregate: { skip, limit },
    });

    return { data, message: `Properties successfully fetched` };
  }

  public async update(id: ObjectId | string, updatePropertyPayload: UpdatePropertyDto): Promise<ServiceResponse> {
    const { files = null } = updatePropertyPayload;

    const propertyExist = await this.property.findById(new ObjectId(id));
    if (!propertyExist) throw new NotFoundException('property not found');

    const property = await this.property.updateById(new ObjectId(id), updatePropertyPayload);

    if (files) {
      const uploadedFiles = await this.processFiles(Array.isArray(files) ? files : [files]);
      await this.savePropertyImages(property._id, uploadedFiles);
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

  private async processFiles(files: any[]): Promise<any[]> {
    if (!files.length) return [];

    const fileData = files.map((file) => ({
      file: file.file,
      placement: file.placement,
    }));

    return Promise.all(
      fileData.map(async (data) => ({
        ...data,
        type: getFileType(data.file.mimetype),
        url: await this.cloudinary.uploadImage(data.file),
      })),
    );
  }

  private async savePropertyImages(propertyId: ObjectId, files: any[]): Promise<void> {
    if (!files.length) return;

    const propertyImageDocuments = files.map((value) => ({
      propertyId,
      ...value,
    }));

    await this.propertyImage.createMany(propertyImageDocuments);
  }
}

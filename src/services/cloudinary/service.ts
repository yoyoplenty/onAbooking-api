import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { MemoryStoredFile } from 'nestjs-form-data';

import { config } from '@on/config';

@Injectable()
export class CloudinaryService {
  private cloudName = config.cloudinary.cloudName;
  private appKey = config.cloudinary.appKey;
  private apiSecret = config.cloudinary.apiSecret;

  constructor() {
    cloudinary.config({
      cloud_name: this.cloudName,
      api_key: this.appKey,
      api_secret: this.apiSecret,
    });
  }

  async uploadImage(image: MemoryStoredFile): Promise<UploadApiResponse> {
    const result = (await cloudinary.uploader.upload(image.buffer.toString('base64'), {
      resource_type: 'auto',
    })) as UploadApiResponse;

    return result;
  }

  async uploadImages(images: MemoryStoredFile[]): Promise<UploadApiResponse[]> {
    const uploadedImages = [];

    for (const image of images) {
      const result = (await cloudinary.uploader.upload(image.buffer.toString('base64'), {
        resource_type: 'auto',
      })) as UploadApiResponse;

      uploadedImages.push(result.secure_url);
    }

    return uploadedImages;
  }
}

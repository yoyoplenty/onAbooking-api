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

  private async uploadImageToCloudinary(image: MemoryStoredFile): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(result);
        }
      });

      stream.end(image.buffer);
    });
  }

  async uploadImage(image: MemoryStoredFile): Promise<string> {
    try {
      const result = await this.uploadImageToCloudinary(image);

      return result.secure_url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async uploadImages(images: MemoryStoredFile[]): Promise<UploadApiResponse[]> {
    try {
      const uploadedImages = [];

      for (const image of images) {
        const result = await this.uploadImageToCloudinary(image);
        uploadedImages.push(result.secure_url);
      }

      return uploadedImages;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

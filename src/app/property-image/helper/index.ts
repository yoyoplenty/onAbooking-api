import { BadRequestException } from '@nestjs/common';

export function getFileType(mimeType: string): 'image' | 'video' {
  if (mimeType.startsWith('image/')) {
    return 'image';
  } else if (mimeType.startsWith('video/')) {
    return 'video';
  }

  throw new BadRequestException(`Unsupported file type: ${mimeType}`);
}

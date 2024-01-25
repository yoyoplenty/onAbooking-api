import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class PropertyUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsArray({ message: 'expected input is an array of files' })
  @IsFile({ each: true })
  @IsOptional()
  files?: MemoryStoredFile[] | any[];
}

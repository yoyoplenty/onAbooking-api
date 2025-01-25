import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class FilePlacementDto {
  @ApiProperty({ description: 'Placement of the file (e.g., bedroom1, living room)' })
  @IsOptional()
  @IsString()
  placement: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'File (image or video)' })
  @IsFile()
  @IsOptional()
  file: MemoryStoredFile | any;
}

export class PropertyUploadDto {
  @ApiProperty({ type: [FilePlacementDto], description: 'Files with their placements' })
  @ValidateNested({ each: true })
  @Type(() => FilePlacementDto)
  @IsArray()
  files: FilePlacementDto[];
}

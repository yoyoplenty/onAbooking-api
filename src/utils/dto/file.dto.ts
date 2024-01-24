import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

export class FileDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @MaxFileSize(1e10)
  @IsFile({ message: 'expected input is a file' })
  @IsNotEmpty()
  file: MemoryStoredFile;
}

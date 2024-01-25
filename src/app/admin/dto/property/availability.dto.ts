import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { PROPERTY_STATUS } from '@on/enums';

export class PropertyAvailabilityDto {
  @ApiProperty({ description: 'Property status', enum: PROPERTY_STATUS })
  @IsEnum(PROPERTY_STATUS)
  @IsNotEmpty()
  status: PROPERTY_STATUS;
}

import { ApiPropertyOptional } from '@nestjs/swagger';

import { PROPERTY_TYPE } from '@on/enums';
import { QueryDto } from '@on/utils/dto/query.dto';

export class QueryBookingDto extends QueryDto {
  @ApiPropertyOptional({ description: 'Property id' })
  propertyId?: string;

  @ApiPropertyOptional({ description: 'User id' })
  userId?: PROPERTY_TYPE;

  @ApiPropertyOptional({ description: 'Booking check in date' })
  checkIn: Date;

  @ApiPropertyOptional({ description: 'Booking checkout date' })
  checkOut: Date;

  @ApiPropertyOptional({ description: 'Filter active bookings based on current date', default: false })
  isActive?: boolean;
}

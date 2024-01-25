import { PartialType } from '@nestjs/swagger';

import { BookingDto } from './book.dto';

export class UpdateBookingDto extends PartialType(BookingDto) {}

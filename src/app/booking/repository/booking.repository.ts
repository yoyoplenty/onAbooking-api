import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base.repository';

import { Booking, BookingDocument } from '../model/booking.model';

export class BookingRepository extends BaseRepository<BookingDocument> {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {
    super(bookingModel);
  }
}

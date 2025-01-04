import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base.repository';

import { Unavailability, UnavailabilityDocument } from '../model/unavailability.model';

export class UnavailabilityRepository extends BaseRepository<UnavailabilityDocument> {
  constructor(@InjectModel(Unavailability.name) private unavailabilityModel: Model<UnavailabilityDocument>) {
    super(unavailabilityModel);
  }
}

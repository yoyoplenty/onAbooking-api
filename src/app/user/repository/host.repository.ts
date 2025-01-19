import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base.repository';

import { Host, HostDocument } from '../model/host/host.model';

export class HostRepository extends BaseRepository<HostDocument> {
  constructor(@InjectModel(Host.name) private hostModel: Model<HostDocument>) {
    super(hostModel);
  }
}

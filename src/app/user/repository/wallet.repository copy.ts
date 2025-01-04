import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '@on/repositories/base.repository';

import { Token, TokenDocument } from '../model/token.model';

export class TokenRepository extends BaseRepository<TokenDocument> {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {
    super(tokenModel);
  }
}

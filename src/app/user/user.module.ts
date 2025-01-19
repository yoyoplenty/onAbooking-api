import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Host, HostSchema } from './model/host/host.model';
import { Token, TokenSchema } from './model/token.model';
import { User, UserSchema } from './model/user/user.model';
import { HostRepository } from './repository/host.repository';
import { TokenRepository } from './repository/token.repository';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Host.name, schema: HostSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserRepository, HostRepository, TokenRepository, UserService],
  exports: [UserRepository, HostRepository, TokenRepository, UserService],
})
export class UserModule {}

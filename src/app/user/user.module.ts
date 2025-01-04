import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Token, TokenSchema } from './model/token.model';
import { User, UserSchema } from './model/user.model';
import { Wallet, WalletSchema } from './model/wallet.model';
import { UserRepository } from './repository/user.repository';
import { WalletRepository } from './repository/wallet.repository';
import { TokenRepository } from './repository/wallet.repository copy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserRepository, WalletRepository, TokenRepository, UserService],
  exports: [UserRepository, WalletRepository, TokenRepository, UserService],
})
export class UserModule {}

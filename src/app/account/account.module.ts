import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PropertyModule } from '../property/property.module';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account, AccountSchema } from './model/account.model';
import { AccountRepository } from './repository/account.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]), PropertyModule],
  controllers: [AccountController],
  providers: [AccountRepository, AccountService],
  exports: [AccountRepository, AccountService],
})
export class AccountModule {}

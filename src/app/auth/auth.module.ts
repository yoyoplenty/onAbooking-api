import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { config } from '@on/config';
import { EmailService } from '@on/services/email/email.service';
import { SmsService } from '@on/services/sms/sms.service';

import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SmsService, EmailService],
  exports: [AuthService],
})
export class AuthModule {}

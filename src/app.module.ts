import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminModule } from './app/admin/admin.module';
import { AuthModule } from './app/auth/auth.module';
import { BookingModule } from './app/booking/booking.module';
import { PropertyModule } from './app/property/property.module';
import { PropertyImageModule } from './app/property-image/property-image.module';
import { UserModule } from './app/user/user.module';
import { AppController } from './app.controller';
import { config } from './config';
import { HttpExceptionFilter } from './handlers/exception/http-filter';
import LoggerMiddleware from './middlewares/logger';

@Module({
  imports: [
    MongooseModule.forRoot(config.db.url),
    UserModule,
    AuthModule,
    AdminModule,
    BookingModule,
    PropertyModule,
    PropertyImageModule,
  ],
  controllers: [AppController],
  providers: [
    {
      useClass: HttpExceptionFilter,
      provide: APP_FILTER,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

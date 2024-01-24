import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { config } from './config';
import { HttpExceptionFilter } from './handlers/exception/http-filter';
import LoggerMiddleware from './middlewares/logger';

@Module({
  imports: [MongooseModule.forRoot(config.db.url)],
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

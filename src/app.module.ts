import { Module, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventLogModule } from './event-log/event-log.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFillter } from './shared/http-error.fillter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersModule } from './helpers/helpers.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/local'),
    TypeOrmModule.forRoot(
      {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "",
        "database": "facebook-multi-pixels2",
        "entities": ["dist/**/*.entity{.ts,.js}", "./src/**/*.enity.ts"],
        "synchronize": true,
        "logging": true
      }
    ),
    EventLogModule,
    HelpersModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 60, // seconds
      max: 10, // maximum number of items in cache
    })


  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFillter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor

    },
  ],
  
})
export class AppModule { }

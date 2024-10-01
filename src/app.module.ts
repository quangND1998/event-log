import { Module, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventLogModule } from './event-log/event-log.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFillter } from './shared/http-error.fillter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersModule } from './helpers/helpers.module';
import { PixelSettingEntity } from './pixels/pixel-setting.entity';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/local'),
    ConfigModule.forRoot({
      envFilePath: '.env', // Path to the .env file (optional, default is '.env')
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        "type": "mysql",
        "host": configService.get<string>('DB_HOST'),
        "port": configService.get<number>('DB_PORT'),
        "username": configService.get<string>('DB_USERNAME'),
        "password": configService.get<string>('DB_PASSWORD'),
        "database": configService.get<string>('DB_DATABASE'),
        "entities": [PixelSettingEntity],
        "synchronize": false,
        "logging": true,
      }),
    }),
    EventLogModule,
    CacheModule.register({
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    HelpersModule,
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

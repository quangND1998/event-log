import { Module } from '@nestjs/common';
import { EventLogController } from './event-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventLogService } from './event-log.service';
import { EventLog, EventLogSchema } from './schemas/event.log.schemas';
import { HelpersModule } from 'src/helpers/helpers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixelEntity } from '../pixels/pixel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PixelEntity]),
    MongooseModule.forFeature([{ name: EventLog.name, schema: EventLogSchema }]),
    HelpersModule
  ],
  controllers: [EventLogController],
  providers: [EventLogService]
})
export class EventLogModule { }

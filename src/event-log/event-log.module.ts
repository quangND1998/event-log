import { Module } from '@nestjs/common';
import { EventLogController } from './event-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventLogService } from './event-log.service';
import { EventLog, EventLogSchema } from './schemas/event.log.schemas';
import { HelpersModule } from 'src/helpers/helpers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixelSettingEntity } from '../pixels/pixel-setting.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: EventLog.name, schema: EventLogSchema }]),TypeOrmModule.forFeature([PixelSettingEntity]),HelpersModule],
  controllers: [EventLogController],
  providers: [EventLogService]
})
export class EventLogModule { }

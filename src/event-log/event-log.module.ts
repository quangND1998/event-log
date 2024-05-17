import { Module } from '@nestjs/common';
import { EventLogController } from './event-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventLogService } from './event-log.service';
import { EventLog, EventLogSchema } from './schemas/event.log.schemas';

@Module({
    imports: [MongooseModule.forFeature([{ name: EventLog.name, schema: EventLogSchema }])],
  controllers: [EventLogController],
  providers: [EventLogService]
})
export class EventLogModule {}

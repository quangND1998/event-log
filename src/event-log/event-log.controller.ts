import { Controller,Get ,Req,Query } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { EventLog } from './schemas/event.log.schemas';
import { Request } from 'express';
import { eventLogRequest } from './interface/eventLogRequest';
@Controller('event-log')
export class EventLogController {

    constructor(private readonly eventLogService: EventLogService) {}

    @Get()
    async findAll(@Query('shop') data:eventLogRequest): Promise<EventLog[]> {

       console.log(data);
      return this.eventLogService.getCollectionByName('quickstart-90bc42fc.myshopify.com_20');
    }
}

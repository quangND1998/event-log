import { Controller,Get ,Req,Query, UsePipes, Inject } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { EventLog } from './schemas/event.log.schemas';
import { Request } from 'express';
import { eventLogRequest } from './interface/eventLogRequest';
import { ValidationPipe } from 'src/shared/validation.pipe';
@Controller('event-log')
export class EventLogController {

    constructor(private readonly eventLogService: EventLogService,
        
    ) {}

    @Get()
    @UsePipes(new ValidationPipe())
    async findAll(@Query() req:eventLogRequest): Promise<EventLog[]> {
      return this.eventLogService.getCollectionByName(req);
    }
}

import { Controller,Get ,Req,Query, UsePipes, Inject, Post, Logger, Body } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { EventLog } from './schemas/event.log.schemas';
import { Request } from 'express';
import { eventLogRequest } from './interface/eventLogRequest';
import { ValidationPipe } from 'src/shared/validation.pipe';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation, ApiTags,
} from '@nestjs/swagger';
import { EventLogStoreRequest } from './interface/eventLogStoreRequest';

@ApiTags('event-logs')
@Controller('api/event-logs')
export class EventLogController {

    constructor(private readonly eventLogService: EventLogService,
        
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get event-log' })
    @ApiResponse({ status: 200, description: 'Return event-log.' })
    @UsePipes(ValidationPipe)
    async findAll(@Query() req:eventLogRequest): Promise<EventLog[]> {
      let promises =  this.eventLogService.getCollectionByName(req);
 
      return promises;
    }

    @Post()
    @ApiOperation({ summary: 'Save event-log' })
    @ApiResponse({ status: 200, description: 'Return event-log.' })
    @UsePipes(ValidationPipe)
    async save(@Body() EventLogStoreRequest: EventLogStoreRequest): Promise<any> {
        Logger.log('EventLogStoreRequest', EventLogStoreRequest);
        return await this.eventLogService.store(EventLogStoreRequest);
    }

}

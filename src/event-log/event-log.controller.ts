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
import { ProductJourneyDto } from './interface/product-journey-dto';
import { OverViewDto } from './interface/over-view-dto';

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

    @Get('product-journey')
    @ApiOperation({ summary: 'Get product-journey' })
    @ApiResponse({ status: 200, description: 'Return product-journey.' })
    @UsePipes(ValidationPipe)
    async productJourney(@Query() req:ProductJourneyDto): Promise<{code: number; status: string; data: EventLog[] }> {
      let eventLogs =await this.eventLogService.productJourney(req);
      return {
        code: 200,
        status: 'success',
        data: eventLogs,
      };
    }
    

    @Get('overview')
    @ApiOperation({ summary: 'Get overview' })
    @ApiResponse({ status: 200, description: 'Return overview.' })
    @UsePipes(ValidationPipe)
    async overview(@Query() req: OverViewDto): Promise<{ code: number; status: string; data: EventLog[] }> {
      let overview = await this.eventLogService.overview(req);
      return {
        code: 200,
        status: 'success',
        data: overview,
      };
    }

}

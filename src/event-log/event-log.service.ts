import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventLog } from './schemas/event.log.schemas';
import { InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Connection } from 'mongoose';
import { eventLogRequest } from './interface/eventLogRequest';
import { HelperService } from 'src/helpers/helpers.service';
@Injectable()
export class EventLogService {

    constructor(
        @InjectModel(EventLog.name) private readonly EventLogModel: Model<EventLog>,
        @InjectConnection() private readonly connection: Connection,
        private readonly helperService: HelperService
    ) { }
       
    async findAll(): Promise<EventLog[]> {
        const createdCat = await this.EventLogModel.find().exec();
        return createdCat;
    }
    async getCollectionByName(req: eventLogRequest): Promise<any> {

        return this.helperService.getFilterDate(req.shop, req.startDate, req.endDate)
        return this.connection.collection(`${this.EventLogModel.collection.name}_${req.shop}`).aggregate([{
            $match: {
                shop: { $eq: 'quickstart-90bc42fc.myshopify.com' },
            }
        },]).toArray();
    }
}

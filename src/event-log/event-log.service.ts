import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventLog } from './schemas/event.log.schemas';
import { InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Connection } from 'mongoose';
@Injectable()
export class EventLogService {

    constructor(
        @InjectModel(EventLog.name) private readonly EventLogModel: Model<EventLog>,
        @InjectConnection() private readonly connection: Connection) { }

    async findAll(): Promise<EventLog[]> {
        const createdCat = await this.EventLogModel.find().exec();
        return createdCat;
    }
    async getCollectionByName(collectionName: string): Promise<any> {
        console.log(this.EventLogModel.collection.name+ collectionName)
        return this.connection.collection(`${this.EventLogModel.collection.name}_${collectionName}`).aggregate([{
            $match: {
              shop: { $eq: 'quickstart-90bc42fc.myshopify.com' },


            }
          },]).toArray();
    }
}

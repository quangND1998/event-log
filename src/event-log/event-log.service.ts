import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventLog, EventLogSchema } from './schemas/event.log.schemas';
import { InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Connection } from 'mongoose';
import { eventLogRequest } from './interface/eventLogRequest';
import { HelpersService } from 'src/helpers/helpers.service';
import moment from 'moment';
import { forEach, groupBy, find, uniq } from 'lodash';
import { EventLogStoreRequest } from './interface/eventLogStoreRequest';

const TOTAL_EVENT_KEYS = {
    "PageView": "total_page_view",
    "ViewContent": "total_view_content",
    "AddToCart": "total_add_to_cart",
    "InitiateCheckout": "total_initiate_checkout",
    "Purchase": "total_purchase",
}
@Injectable()
export class EventLogService {

    constructor(
        @InjectModel(EventLog.name) private readonly EventLogModel: Model<EventLog>,
        @InjectConnection() private readonly connection: Connection,
        private readonly helpersService: HelpersService
    ) { }

    async findAll(): Promise<EventLog[]> {
        const createdCat = await this.EventLogModel.find().exec();
        return createdCat;
    }
    async getCollectionByName(req: eventLogRequest): Promise<any> {
        const filterDate = await this.helpersService.getFilterDate(req.shop, req.startDate, req.endDate)

        let startDate = filterDate.$gte;
        let endDate = filterDate.$lt;
        // return this.helpersService.getFilterDate(req.shop, req.startDate, req.endDate)
        let promises = [];
        let group_names = [];
        let group_ids = [];

        let group = req.group
        let level = req.level
        let names = req.names ? req.names : []
        let search = req.search ? req.search : ''
        let utmSource = req.utm_source ? req.utm_source : ''
        let filters = req.filtering ? req.filtering : []

        let matchs: any = {
            utm_campaign: { $exists: true }
        }

        if (search) {
            if (level === 'adset') {
                matchs = {
                    ...matchs,
                    adset_name: { $regex: new RegExp('.*' + search + '.*', 'i') }
                }
            } else if (level === 'ad') {
                matchs = {
                    ...matchs,
                    ad_name: { $regex: new RegExp('.*' + search + '.*', 'i') }
                }
            } else {
                matchs = {
                    ...matchs,
                    utm_campaign: { $regex: new RegExp('.*' + search + '.*', 'i') }
                }
            }
        }

        if (utmSource) {
            matchs = {
                ...matchs,
                utm_source: { $eq: utmSource }
            }
        }

        if (level === 'adset' && names.length) {
            matchs = {
                ...matchs,
                $and: [
                    { adset_name: { $exists: true } },
                    { utm_campaign: { $in: group_names } },
                    {
                        $or: [
                            { campaign_id: { $in: group_ids } },
                            { campaign_id: { $exists: false } },
                            { campaign_id: { $eq: 'undetectable' } },
                        ]
                    }
                ]
            }
        }

        if (level === 'ad' && names.length) {
            if (group === 'campaign') {
                matchs = {
                    ...matchs,
                    $and: [
                        { ad_name: { $exists: true } },
                        { utm_campaign: { $in: group_names } },
                        {
                            $or: [
                                { campaign_id: { $in: group_ids } },
                                { campaign_id: { $exists: false } },
                                { campaign_id: { $eq: 'undetectable' } },
                            ]
                        }
                    ]
                }
            } else {
                matchs = {
                    ...matchs,
                    $and: [
                        { ad_name: { $exists: true } },
                        { adset_name: { $in: group_names } },
                        {
                            $or: [
                                { adset_id: { $in: group_ids } },
                                { adset_id: { $exists: false } },
                                { adset_id: { $eq: 'undetectable' } },
                            ]
                        }
                    ]
                }
            }
        }
        let groupId = level === 'adset' ? 'adset_id' : (level === 'ad' ? 'ad_id' : 'campaign_id')
        level = level === 'adset' ? 'adset_name' : (level === 'ad' ? 'ad_name' : 'utm_campaign')
        names.forEach((name) => {
            const arrSplit = name.split('-');
            group_ids.push(arrSplit[0] == 'undefined' ? undefined : arrSplit[0]);
            group_names.push(arrSplit.slice(1).join('-'))
        })
        let days = this.helpersService.getDayRange(startDate, endDate)

        days.forEach(async (day) => {
            let aggregate = await this.connection.collection(`${this.EventLogModel.collection.name}_${day}`).aggregate([
                {
                    $match: {
                        shop: { $eq: req.shop },
                        event_time: { $gte: startDate, $lt: endDate },
                        ...matchs
                    }
                },
                {
                    $group: {
                        _id: { group_name: `$${level}`, group_id: `$${groupId}`, name: "$name", utm_source: "$utm_source" },
                        order_ids: { $push: "$order_id" },
                        count: { $sum: 1 },
                        revenue: {
                            $sum: "$order_value"
                        }
                    }
                },
                {
                    $group: {
                        _id: { group_name: "$_id.group_name", group_id: "$_id.group_id", utm_source: "$_id.utm_source" },
                        events: { $push: { name: "$_id.name", count: "$count", revenue: "$revenue", order_ids: "$order_ids" } },
                    }
                },
                { $sort: { event_time: -1 } }
            ]).toArray()
            promises.push(aggregate)
        });
        for (let week = moment(startDate).week(); week <= moment(endDate).week(); week++) {
            let aggregate = await this.connection.collection(`${this.EventLogModel.collection.name}_${req.shop}_${week}`).aggregate([
                {
                    $match: {
                        shop: { $eq: req.shop },
                        event_time: { $gte: startDate, $lt: endDate },
                        ...matchs
                    }
                },
                {
                    $group: {
                        _id: { group_name: `$${level}`, group_id: `$${groupId}`, name: "$name", utm_source: "$utm_source" },
                        order_ids: { $push: "$order_id" },
                        count: { $sum: 1 },
                        revenue: {
                            $sum: "$order_value"
                        }
                    }
                },
                {
                    $group: {
                        _id: { group_name: "$_id.group_name", group_id: "$_id.group_id", utm_source: "$_id.utm_source" },
                        events: { $push: { name: "$_id.name", count: "$count", revenue: "$revenue", order_ids: "$order_ids" } },
                    }
                },
                { $sort: { event_time: -1 } }
            ]).toArray();
            promises.push(aggregate)
        }
        let result = [];
        let results = []

        forEach(promises, promise => {
            forEach(promise, item => {
                let obj = {
                    id: item['_id']['group_name'] + '-' + item['_id']['group_id'],
                    group_name: item['_id']['group_name'],
                    group_id: item['_id']['group_id'],
                    utm_source: item['_id']['utm_source'],
                    total_page_view: 0,
                    total_view_content: 0,
                    total_add_to_cart: 0,
                    total_initiate_checkout: 0,
                    total_purchase: 0,
                    revenue: 0
                }
                item['events'].forEach(event => {
                    let key = TOTAL_EVENT_KEYS[event['name']]
                    let count = event['count']
                    let revenue = event['revenue']
                    if (event['name'] === 'Purchase' && 'order_ids' in event && event['order_ids'].length) {
                        let orderLength = event['order_ids'].length ? event['order_ids'].length : 1
                        let avg = revenue / orderLength
                        count = uniq(event['order_ids']).length
                        revenue = avg * count
                    }
                    obj[key] = obj[key] + count
                    obj['revenue'] = obj['revenue'] + revenue
                });
                result.push(obj)
            })
        })

        let resultGroup = groupBy(result, 'id')
        forEach(resultGroup, (data, key) => {
            let source = find(data, { utm_source: 'Facebook' }) || find(data, { utm_source: 'facebook' })

            let obj = {
                group_id: data[0].group_id,
                group_name: data[0].group_name,
                utm_source: source ? 'Facebook' : 'Other',
                total_page_view: 0,
                total_view_content: 0,
                total_add_to_cart: 0,
                total_initiate_checkout: 0,
                total_purchase: 0,
                revenue: 0
            }
            forEach(data, item => {
                obj.total_page_view = obj.total_page_view + item.total_page_view
                obj.total_view_content = obj.total_view_content + item.total_view_content
                obj.total_add_to_cart = obj.total_add_to_cart + item.total_add_to_cart
                obj.total_initiate_checkout = obj.total_initiate_checkout + item.total_initiate_checkout
                obj.total_purchase = obj.total_purchase + item.total_purchase
                obj.revenue = obj.revenue + item.revenue
            })
            results.push(obj)
        })
        console.log(results)
        filters.forEach((filter) => {

            results = results.filter((result) => {
                return result[filter.field] >= filter.value[0] && result[filter.field] <= filter.value[1]
            })
        })

        return results;

    }


    async store(req: EventLogStoreRequest): Promise<EventLog> {
        if ('event_time' in req) {
            req['event_time'] = new Date(req['event_time'] + 'Z')
        }
        ['utm_campaign', 'adset_name', 'ad_name', 'campaign_id', 'adset_id', 'ad_id'].forEach(field => {
            if (field in req && (req[field] === null || req[field] === '')) {
                delete req[field];
            } else {
                req[field] = this.helpersService.decodeUrl(req[field]);
            }
        });

        let eventLog = null;
        const suffix = moment(req['event_time']).utc().week();
        Logger.log('Suffix:', suffix);
        // Dynamically generate the Mongoose model
        const EventLogDay = this.connection.model('EventLogDay', EventLogSchema, `${this.EventLogModel.collection.name}_${req['shop']}_${suffix}`);

        if (req['name'] === 'Purchase') {
            try {
                // Find an existing event by order_id and status
                const existingEvent = await EventLogDay.findOne({ order_id: req['order_id'], status: req['status'] });
                Logger.log('Existing Event:', existingEvent);
                if (existingEvent) {
                    // Check if the pixel is already in the pixels array
                    if (!existingEvent.pixels.includes(req.pixel)) {
                        existingEvent.pixels.push(req.pixel);
                        await EventLogDay.updateOne(
                            { _id: existingEvent._id },
                            { $set: { pixels: existingEvent.pixels } }
                        );

                        Logger.log('Updated existing event with new pixel.');
                    }
                    eventLog = existingEvent;
                } else {
                    // Prepare to create a new document
                    req['pixels'] = [req['pixel']];
                    const newEventLog = new EventLogDay(req);
                    eventLog = await newEventLog.save();
                    return eventLog;
                    // eventLog = await EventLogDay.findOne({ _id: result.insertedId });
                    // Logger.log('Created new event log:', eventLog);
                }

                return eventLog; // Adjust the response as needed
            } catch (error) {
                throw new HttpException({ message: 'Something went wrong', error }, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        try{
            const newEventLog = new EventLogDay(req);
            eventLog = await newEventLog.save();
            return eventLog;
        }catch(error){
            Logger.error('Error saving new event log:', error); // Log the complete error
            throw new HttpException(
                {
                    message: 'Something went wrong while saving the event log.',
                    error: error.message, // Optionally include the error message
                    stack: error.stack, // Include stack trace for debugging
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
       
    }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
export type EventLogDocument = HydratedDocument<EventLog>;
const EXPIRE_DAYS = 60
@Schema({ collection: 'fb_pixel_event_logs' })
export class EventLog extends Document {
    @Prop({ required: true })
    shop:  String

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    status: String;


    @Prop({ default: Date.now })
    event_time: Date

    @Prop({ default: Date.now })
    created_at: Date

    @Prop({ type: MongooseSchema.Types.Array })
    plan: []

    @Prop({ type: MongooseSchema.Types.Mixed })
    log: any;


    @Prop()
    order_id: Number

    @Prop()
    order_number: String

    @Prop()
    order_value: Number

    @Prop()
    suborder_value: Number
    

    @Prop({ required: true })
    pixel: String 

    @Prop()
    pixel_title:String 

    @Prop()
    utm_campaign:  String 

    @Prop()
    adset_name:  String

    @Prop()
    ad_name: String 

    @Prop()
    campaign_id: String 

    @Prop()
    adset_id:  String 

    @Prop()
    ad_id: String

    @Prop({type: Array})
    products:  []
    
    @Prop()
    pending_log: String
    

    @Prop({ type: MongooseSchema.Types.Array })
    pixels: [String]

    @Prop({type: Array})
    campaigns_history:  []

    @Prop({ default: '' })
    external_id: String 

    @Prop({ default: '' })
    event_source_url: String

    @Prop({ default: '' })
    section_order_id: String

    @Prop()
    utm_source: String
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);
EventLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 * EXPIRE_DAYS }); 
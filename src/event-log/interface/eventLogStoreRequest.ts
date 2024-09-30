import { IsEmail, IsNotEmpty, isNotEmpty , IsIn, Validate } from 'class-validator';
import { IsShopifyDomainConstraint } from '../../validators/is-shopify-domain.validator'; // Import custom validator
export class EventLogStoreRequest {

    @IsNotEmpty({message: 'shop is required'})
    @Validate(IsShopifyDomainConstraint, { message: 'Invalid shop name' })
    shop: string
    
    @IsNotEmpty({message: 'name is required'})
    name: string



    @IsNotEmpty({message: 'status is required'})
    @IsIn(['success', 'fail', 'pending', 'ignore'], {
      message: 'Status must be either success or fail or pending or ignore',
    })
    status: string

    @IsNotEmpty({message: 'pixel is required'})
    pixel: string

    @IsNotEmpty({message: 'event_time is required'})
    event_time: Date

    @IsNotEmpty({message: 'pixel_title is required'})
    pixel_title: string


    // utm_campaign?: string
    // adset_name?: string
    // ad_name?: string
    // campaign_id?: string
    // adset_id?: string
    // ad_id?: string
    // external_id?: string
    // event_source_url?: string
    // section_order_id?: string

    // order_id: string

    // order_number: string

    // order_value: number

    // suborder_value: number

  
}


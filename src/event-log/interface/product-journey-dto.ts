import { IsEmail, IsNotEmpty, isNotEmpty } from 'class-validator';

export class ProductJourneyDto {
    @IsNotEmpty()
    shop: string

    @IsNotEmpty()
    external_id: string

    @IsNotEmpty()
    orderCreated: Date

    @IsNotEmpty()
    pixel: boolean

    section_order_id?: string


}   

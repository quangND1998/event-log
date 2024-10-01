import { IsEmail, IsNotEmpty, isNotEmpty } from 'class-validator';

export class ProductJourneyDto {
    @IsNotEmpty()
    shop: string

    @IsNotEmpty()
    external_id: string

    @IsNotEmpty()
    order_created: Date

    @IsNotEmpty()
    pixel: boolean


}   

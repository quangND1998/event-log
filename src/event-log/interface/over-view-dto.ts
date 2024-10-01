import { IsEmail, IsNotEmpty, isNotEmpty } from 'class-validator';

export class OverViewDto {
    @IsNotEmpty()
    shop: string



}   

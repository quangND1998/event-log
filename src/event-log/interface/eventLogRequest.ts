import { IsEmail, IsNotEmpty } from 'class-validator';

export class eventLogRequest {
  @IsNotEmpty()
  shop: string;
  @IsNotEmpty()
  group: string;

  startDate?: Date
  endDate?: Date;
  level?: string;
  search?: string;
  names?: string[];
  utm_source? :string;
  filtering?:string;
}
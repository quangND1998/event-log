import { IsEmail, IsNotEmpty } from 'class-validator';

export class eventLogRequest {
  @IsNotEmpty()
  shop: string;
  @IsNotEmpty()
  group: string;
}
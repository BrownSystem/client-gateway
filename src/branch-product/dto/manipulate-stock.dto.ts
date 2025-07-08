import { IsNumber, IsPositive, IsString } from 'class-validator';

export class ManipulateStockDto {
  @IsPositive()
  @IsNumber()
  quantity: number;
}

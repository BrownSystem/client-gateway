import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class ClosedBoxDailyDto {
  @IsString()
  branchId: string;

  @IsString()
  branchName: string;

  @IsNumber({ maxDecimalPlaces: 4 })
  closingAmount: number;

  @IsNumber({ maxDecimalPlaces: 4 })
  realAmount: number;

  @IsString()
  closedBy: string;
}

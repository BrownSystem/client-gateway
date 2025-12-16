import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReopenBoxDailyDto {
  @IsString()
  branchId: string;

  @IsString()
  branchName: string;

  @IsString()
  openedBy: string;

  @IsNumber({ maxDecimalPlaces: 4 })
  openingAmount: number;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}

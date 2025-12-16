import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BoxStatus } from 'src/common/enum/status.enum';

export class OpenBoxDailyDto {
  @IsString()
  branchId: string;

  @IsString()
  branchName: string;

  @IsString()
  openedBy: string;

  @IsNumber({ maxDecimalPlaces: 4 })
  openingAmount: number;

  @IsEnum(BoxStatus)
  @IsOptional()
  status: BoxStatus;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}

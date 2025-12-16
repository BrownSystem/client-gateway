import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Currency, PaymentMethod } from 'src/common/enum';

export class CreateInitialPaymentDto {
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @IsEnum(Currency)
  currency: Currency;

  @IsNumber({ maxDecimalPlaces: 4 })
  @IsOptional()
  exchangeRate?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  originalAmount?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  receivedAt?: Date;

  @IsString()
  @IsOptional()
  receivedBy?: string;

  @IsString()
  @IsOptional()
  bankId?: string;

  @IsString()
  @IsOptional()
  cardId?: string;

  @IsString()
  @IsOptional()
  chequeNumber?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  chequeDueDate?: Date;

  @IsOptional()
  @IsString({ message: 'El banco del cheque es obligatorio' })
  chequeBank: string;

  @IsString()
  @IsOptional()
  chequeStatus?: string;

  @IsString()
  @IsOptional()
  observation: string;

  @IsString()
  branchId: string;

  @IsString()
  branchName: string;
}

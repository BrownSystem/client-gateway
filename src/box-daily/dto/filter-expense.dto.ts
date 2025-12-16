import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterExpenseDto {
  @IsString()
  @IsNotEmpty()
  branchId: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  month: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsOptional()
  transactionType?: string; // opcional para filtrar un tipo específico
}

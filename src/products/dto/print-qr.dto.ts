import { IsArray, ValidateNested, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductQrItemDto {
  @IsString()
  code: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class PrintQrDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductQrItemDto)
  products: ProductQrItemDto[];
}

import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CardType } from 'src/common/enum/card-type.enum';

export class CreateCardDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  quotas?: number;

  @IsEnum(CardType)
  cardType: CardType;

  @IsBoolean()
  available: boolean;
}

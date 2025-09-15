import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ContactType, DocumentType, IvaCondition } from '../enum';

export class CreateContactDto {
  @IsString()
  @IsOptional()
  branchId?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  businessName?: string;

  @IsEnum(IvaCondition)
  @IsOptional()
  ivaCondition?: IvaCondition;

  @IsEnum(DocumentType)
  @IsOptional()
  documentType?: DocumentType;

  @IsString()
  @IsOptional()
  @Matches(/^(\d{2}\d{8}\d|\d{7,8})$/, {
    message: 'Debe ser un CUIT/CUIL (XX-XXXXXXXX-X) o DNI (7 u 8 dígitos)',
  })
  documentNumber?: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEnum(ContactType)
  @IsOptional()
  type?: ContactType;
}

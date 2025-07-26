import { IsEnum, IsString } from 'class-validator';

enum TypeOfDelete {
  SOFT = 'SOFT',
  REPLENISH = 'REPLENISH',
}

export class DeleteVoucherDto {
  @IsEnum(TypeOfDelete)
  typeOfDelete: TypeOfDelete;
}

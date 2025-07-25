import { IsEnum, IsString } from 'class-validator';
import { VoucherType } from 'src/common/enum';
export class GenerateNumberVoucherDto {
  @IsEnum(VoucherType)
  type: VoucherType;

  @IsString()
  emissionBranchId: string;
}

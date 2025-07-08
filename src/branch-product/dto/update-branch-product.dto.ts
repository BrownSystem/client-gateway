import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchProductDto } from './create-branch-product.dto';

export class UpdateBranchProductDto extends PartialType(CreateBranchProductDto) {
  id: number;
}

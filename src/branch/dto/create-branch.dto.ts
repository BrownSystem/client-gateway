import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}

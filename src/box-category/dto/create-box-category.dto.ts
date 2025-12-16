import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateBoxCategoryDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  available: boolean;
}

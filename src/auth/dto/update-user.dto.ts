import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserchDto extends PartialType(RegisterUserDto) {
  @IsBoolean()
  @IsOptional()
  available?: boolean;
}

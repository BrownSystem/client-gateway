import { RegisterUserDto } from './register-user.dto';
declare const UpdateUserchDto_base: import("@nestjs/mapped-types").MappedType<Partial<RegisterUserDto>>;
export declare class UpdateUserchDto extends UpdateUserchDto_base {
    available?: boolean;
}
export {};

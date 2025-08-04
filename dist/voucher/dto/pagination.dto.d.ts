import { ConditionPayment, VoucherType } from 'src/common/enum';
export declare class PaginationDto {
    conditionPayment: ConditionPayment;
    emissionBranchId: string;
    limit: number;
    offset: number;
    type?: VoucherType;
    search?: string;
    constructor(partial?: Partial<PaginationDto>);
}

import { ConditionPayment } from 'src/common/enum';
export declare class PaginationDto {
    conditionPayment: ConditionPayment;
    emissionBranchId: string;
    limit: number;
    offset: number;
    search?: string;
    constructor(partial?: Partial<PaginationDto>);
}

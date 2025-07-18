export declare class PaginationDto {
    branchId: string;
    search?: string;
    type: string;
    limit: number;
    offset: number;
    constructor(partial?: Partial<PaginationDto>);
}

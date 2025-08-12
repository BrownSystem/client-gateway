export declare class PaginationDto {
    branchId: string;
    limit: number;
    offset: number;
    filterByStock: boolean;
    constructor(partial?: Partial<PaginationDto>);
}

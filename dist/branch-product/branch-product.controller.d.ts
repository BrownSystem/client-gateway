import { ClientProxy } from '@nestjs/microservices';
import { ManipulateStockDto } from './dto/manipulate-stock.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Response } from 'express';
export declare class BranchProductController {
    private readonly client;
    constructor(client: ClientProxy);
    generatedFullInventory(res: Response): Promise<void>;
    getProductsByBranchId(paginationDto: PaginationDto): Promise<any>;
    outOfStock(paginationDto: PaginationDto): Promise<any>;
    increaseBranchProductStock(branchProductId: string, manipulateStockDto: ManipulateStockDto): Promise<any>;
    descreaseBranchProductStock(branchProductId: string, manipulateStockDto: ManipulateStockDto): Promise<any>;
}

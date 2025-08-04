import { ClientProxy } from '@nestjs/microservices';
import { IProductsController, PaginationDto } from 'src/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { PrintQrDto } from './dto/print-qr.dto';
export declare class ProductsController implements IProductsController {
    private readonly client;
    constructor(client: ClientProxy);
    createProduct(createProductDto: CreateProductDto): Promise<any>;
    uploadFile(file: Express.Multer.File): Promise<any>;
    printQrs(body: PrintQrDto, res: Response): Promise<void>;
    downloadProductsWithPdf(body: PrintQrDto, res: Response): Promise<void>;
    findAllProducts(paginationDto: PaginationDto): Promise<any>;
    findProductsBySearch(paginationDto: PaginationDto): Promise<any>;
    SearchProductsWithAllBranch(paginationDto: PaginationDto): Promise<any>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<any>;
    delete(): Promise<any>;
}

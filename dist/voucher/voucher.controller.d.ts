import { CreateVoucherDto } from './dto/create-voucher.dto';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from './dto/pagination.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateVoucherProductItemDto } from './dto/voucher-product-item.dto';
import { Response } from 'express';
export declare class VoucherController {
    private readonly clientProxy;
    constructor(clientProxy: ClientProxy);
    create(createVoucherDto: CreateVoucherDto): Promise<{
        success: boolean;
        data: any;
        message: any;
    }>;
    registerPayment(paymentDto: CreatePaymentDto): Promise<{
        success: boolean;
        data: any;
        message: any;
    }>;
    searchVoucher(pagination: PaginationDto): Promise<any>;
    findAllReservedProductsByBranchId(pagination: PaginationDto): Promise<any>;
    generatePdf(id: string, download: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateReservedProduct(id: string, updateVoucherProductItemDto: UpdateVoucherProductItemDto): Promise<any>;
}

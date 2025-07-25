"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherController = void 0;
const common_1 = require("@nestjs/common");
const create_voucher_dto_1 = require("./dto/create-voucher.dto");
const config_1 = require("../config");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const pagination_dto_1 = require("./dto/pagination.dto");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const voucher_product_item_dto_1 = require("./dto/voucher-product-item.dto");
const generate_number_dto_1 = require("./dto/generate-number.dto");
let VoucherController = class VoucherController {
    clientProxy;
    constructor(clientProxy) {
        this.clientProxy = clientProxy;
    }
    async create(createVoucherDto) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'create_voucher' }, createVoucherDto));
            return {
                success: true,
                data: response?.data || response,
                message: response?.message || 'Comprobante registrado correctamente.',
            };
        }
        catch (error) {
            throw new microservices_1.RpcException(`[GATEWAY] Error al crear el comprobante: ${error.message}`);
        }
    }
    async registerPayment(paymentDto) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'register_payment' }, paymentDto));
            return {
                success: true,
                data: response?.data || response,
                message: response?.message || 'Pago registrado correctamente.',
            };
        }
        catch (error) {
            throw new microservices_1.RpcException(`[GATEWAY] Error al registrar el pago: ${error.message}`);
        }
    }
    async searchVoucher(pagination) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'find_all_vouchers_condition_payment' }, pagination));
            return response;
        }
        catch (error) {
            throw new microservices_1.RpcException(`[GATEWAY] Error al obtener las condiciones de pago: ${error.message}`);
        }
    }
    async findAllReservedProductsByBranchId(pagination) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'find_all_reserved_products' }, pagination));
            return response;
        }
        catch (error) {
            throw new microservices_1.RpcException(`[GATEWAY] Error al obtener los productos reservados: ${error.message}`);
        }
    }
    async generateHtml(id, download, res) {
        try {
            const html = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'generate_voucher_html' }, id));
            res.setHeader('Content-Disposition', `${download === 'true' ? 'attachment' : 'inline'}; filename=comprobante-${id}.html`);
            return res.status(common_1.HttpStatus.OK).send(html);
        }
        catch (error) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'No se pudo generar el comprobante.' });
        }
    }
    async generateNumber(dto) {
        try {
            const numberOfVoucher = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'generate_number_voucher' }, dto));
            return numberOfVoucher;
        }
        catch (error) {
            throw new microservices_1.RpcException(`[GATEWAY] Error al obtener el numero de comprobante ${error}`);
        }
    }
    async updateReservedProduct(id, updateVoucherProductItemDto) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'update_reserved_product' }, { id, data: updateVoucherProductItemDto }));
            return response;
        }
        catch (error) {
            throw new microservices_1.RpcException(`[GATEWAY] Error al actualizar el producto reservado: ${error.message}`);
        }
    }
};
exports.VoucherController = VoucherController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_voucher_dto_1.CreateVoucherDto]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('register-payment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "registerPayment", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "searchVoucher", null);
__decorate([
    (0, common_1.Get)('reserved'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "findAllReservedProductsByBranchId", null);
__decorate([
    (0, common_1.Get)('html/:id'),
    (0, common_1.Header)('Content-Type', 'text/html'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('download')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "generateHtml", null);
__decorate([
    (0, common_1.Post)('generate-number'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_number_dto_1.GenerateNumberVoucherDto]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "generateNumber", null);
__decorate([
    (0, common_1.Patch)('reserved-update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, voucher_product_item_dto_1.UpdateVoucherProductItemDto]),
    __metadata("design:returntype", Promise)
], VoucherController.prototype, "updateReservedProduct", null);
exports.VoucherController = VoucherController = __decorate([
    (0, common_1.Controller)('voucher'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], VoucherController);
//# sourceMappingURL=voucher.controller.js.map
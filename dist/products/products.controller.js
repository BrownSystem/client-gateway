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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const common_2 = require("../common");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const config_1 = require("../config");
const pipes_1 = require("../common/pipes");
const auth_guard_1 = require("../auth/guards/auth.guard");
const guards_1 = require("../common/guards");
const decorators_1 = require("../common/decorators");
const role_auth_enum_1 = require("../common/enum/role.auth.enum");
const platform_express_1 = require("@nestjs/platform-express");
const parseExcelFile_1 = require("./utils/parseExcelFile");
const fs = require("fs");
const path = require("path");
const print_qr_dto_1 = require("./dto/print-qr.dto");
let ProductsController = class ProductsController {
    client;
    constructor(client) {
        this.client = client;
    }
    async createProduct(createProductDto) {
        try {
            const createProducts = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'create_product' }, createProductDto));
            return createProducts;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async uploadFile(file) {
        try {
            const rows = (0, parseExcelFile_1.parseExcelFile)(file.buffer);
            const upload = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'upload_products_with_file' }, rows));
            return upload;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async printQrs(body, res) {
        try {
            const pdfBase64 = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'generate_pdf_file_with_qrs' }, body.products));
            const pdfBuffer = Buffer.from(pdfBase64, 'base64');
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="qrs.pdf"',
            });
            const outputPath = path.join(__dirname, '../../test-output.pdf');
            fs.writeFileSync(outputPath, pdfBuffer);
            res.send(pdfBuffer);
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async downloadProductsWithPdf(body, res) {
        try {
            const pdfBase64 = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'generate_pdf_with_products' }, body.products));
            const pdfBuffer = Buffer.from(pdfBase64, 'base64');
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="qrs.pdf"',
            });
            const outputPath = path.join(__dirname, '../../test-output.pdf');
            fs.writeFileSync(outputPath, pdfBuffer);
            res.send(pdfBuffer);
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async findAllProducts(paginationDto) {
        try {
            const findAll = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_all_product' }, paginationDto));
            return findAll;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async findProductsBySearch(paginationDto) {
        try {
            const findProducts = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'search_products' }, paginationDto));
            return findProducts;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async SearchProductsWithAllBranch(paginationDto) {
        try {
            const findProducts = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'search_products_with_all_branch_inventory' }, paginationDto));
            return findProducts;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async updateProduct(id, updateProductDto) {
        try {
            const updateProduct = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update_product' }, {
                id,
                ...updateProductDto,
            }));
            return updateProduct;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async delete() {
        try {
            const deleteProducts = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'delete-all-products' }, {}));
            return deleteProducts;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('download-pdf-qrs'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [print_qr_dto_1.PrintQrDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "printQrs", null);
__decorate([
    (0, common_1.Post)('download-pdf-products'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [print_qr_dto_1.PrintQrDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "downloadProductsWithPdf", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAllProducts", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findProductsBySearch", null);
__decorate([
    (0, common_1.Get)('by-branches'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.PaginationDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "SearchProductsWithAllBranch", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN, role_auth_enum_1.RoleAuthEnum.SELLER),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseStringPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('delete-all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "delete", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ProductsController);
//# sourceMappingURL=products.controller.js.map
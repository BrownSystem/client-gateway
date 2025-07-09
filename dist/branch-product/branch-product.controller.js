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
exports.BranchProductController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
const microservices_1 = require("@nestjs/microservices");
const auth_guard_1 = require("../auth/guards/auth.guard");
const guards_1 = require("../common/guards");
const role_auth_enum_1 = require("../common/enum/role.auth.enum");
const decorators_1 = require("../common/decorators");
const rxjs_1 = require("rxjs");
const manipulate_stock_dto_1 = require("./dto/manipulate-stock.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
let BranchProductController = class BranchProductController {
    client;
    constructor(client) {
        this.client = client;
    }
    async generatedFullInventory(res) {
        try {
            const bufferObject = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'generated_full_inventary_in_excel' }, {}));
            const buffer = Buffer.from(bufferObject.data);
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="inventario_completo.xlsx"',
                'Content-Length': buffer.length,
            });
            res.end(buffer);
        }
        catch (error) {
            throw new microservices_1.RpcException('Failed to download inventory file: ' + error.message);
        }
    }
    async getProductsByBranchId(paginationDto) {
        try {
            const branch = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_all_stock_branch' }, paginationDto));
            return branch;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async outOfStock(paginationDto) {
        try {
            const branch = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_out_of_stock_branch' }, paginationDto));
            return branch;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async increaseBranchProductStock(branchProductId, manipulateStockDto) {
        try {
            const { quantity } = manipulateStockDto;
            const updatedInventory = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'increase_branch_product_stock' }, { id: branchProductId, stock: quantity }));
            return updatedInventory;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async descreaseBranchProductStock(branchProductId, manipulateStockDto) {
        try {
            const { quantity } = manipulateStockDto;
            const updatedInventory = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'descrease_branch_product_stock' }, { id: branchProductId, stock: quantity }));
            return updatedInventory;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
};
exports.BranchProductController = BranchProductController;
__decorate([
    (0, common_1.Get)('excel'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BranchProductController.prototype, "generatedFullInventory", null);
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], BranchProductController.prototype, "getProductsByBranchId", null);
__decorate([
    (0, common_1.Get)('products-out-of-stock'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], BranchProductController.prototype, "outOfStock", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN),
    (0, common_1.Patch)('increase-stock/:branchProductId'),
    __param(0, (0, common_1.Param)('branchProductId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, manipulate_stock_dto_1.ManipulateStockDto]),
    __metadata("design:returntype", Promise)
], BranchProductController.prototype, "increaseBranchProductStock", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN),
    (0, common_1.Patch)('descrease-stock/:branchProductId'),
    __param(0, (0, common_1.Param)('branchProductId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, manipulate_stock_dto_1.ManipulateStockDto]),
    __metadata("design:returntype", Promise)
], BranchProductController.prototype, "descreaseBranchProductStock", null);
exports.BranchProductController = BranchProductController = __decorate([
    (0, common_1.Controller)('inventory'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], BranchProductController);
//# sourceMappingURL=branch-product.controller.js.map
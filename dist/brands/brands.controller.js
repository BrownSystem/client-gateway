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
exports.BrandsController = void 0;
const common_1 = require("@nestjs/common");
const create_brand_dto_1 = require("./dto/create-brand.dto");
const update_brand_dto_1 = require("./dto/update-brand.dto");
const config_1 = require("../config");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const pipes_1 = require("../common/pipes");
const auth_guard_1 = require("../auth/guards/auth.guard");
const guards_1 = require("../common/guards");
const decorators_1 = require("../common/decorators");
const role_auth_enum_1 = require("../common/enum/role.auth.enum");
let BrandsController = class BrandsController {
    client;
    constructor(client) {
        this.client = client;
    }
    async create(createBrandDto) {
        try {
            const createBrand = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'create_brand' }, createBrandDto));
            return createBrand;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async findOne(id) {
        try {
            const brand = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_brand' }, id));
            return brand;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async update(id, updateBrandDto) {
        try {
            const updateBrand = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update_brand' }, { id, ...updateBrandDto }));
            return updateBrand;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
};
exports.BrandsController = BrandsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_brand_dto_1.CreateBrandDto]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_brand_dto_1.UpdateBrandDto]),
    __metadata("design:returntype", Promise)
], BrandsController.prototype, "update", null);
exports.BrandsController = BrandsController = __decorate([
    (0, common_1.Controller)('brands'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], BrandsController);
//# sourceMappingURL=brands.controller.js.map
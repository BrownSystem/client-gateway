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
exports.BanksController = void 0;
const common_1 = require("@nestjs/common");
const update_bank_dto_1 = require("./dto/update-bank.dto");
const create_back_dto_1 = require("./dto/create-back.dto");
const config_1 = require("../config");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const auth_guard_1 = require("../auth/guards/auth.guard");
const guards_1 = require("../common/guards");
const enum_1 = require("../common/enum");
const decorators_1 = require("../common/decorators");
let BanksController = class BanksController {
    clientProxy;
    constructor(clientProxy) {
        this.clientProxy = clientProxy;
    }
    async create(createBankDto) {
        try {
            const createBank = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'create_bank' }, createBankDto));
            return createBank;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async findAll() {
        try {
            const banks = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'find_all_banks' }, {}));
            return banks;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async findOne(id) {
        try {
            const bank = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'find_one_banks' }, { id }));
            return bank;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async update(id, updateBankDto) {
        try {
            const bank = await (0, rxjs_1.firstValueFrom)(this.clientProxy.send({ cmd: 'update_bank' }, { id, ...updateBankDto }));
            return bank;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
};
exports.BanksController = BanksController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(enum_1.RoleAuthEnum.ADMIN, enum_1.RoleAuthEnum.MANAGER),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_back_dto_1.CreateBankDto]),
    __metadata("design:returntype", Promise)
], BanksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BanksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BanksController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(enum_1.RoleAuthEnum.ADMIN, enum_1.RoleAuthEnum.MANAGER),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bank_dto_1.UpdateBankDto]),
    __metadata("design:returntype", Promise)
], BanksController.prototype, "update", null);
exports.BanksController = BanksController = __decorate([
    (0, common_1.Controller)('banks'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], BanksController);
//# sourceMappingURL=banks.controller.js.map
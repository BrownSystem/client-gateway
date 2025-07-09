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
exports.BranchController = void 0;
const common_1 = require("@nestjs/common");
const create_branch_dto_1 = require("./dto/create-branch.dto");
const update_branch_dto_1 = require("./dto/update-branch.dto");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("../config");
const rxjs_1 = require("rxjs");
const auth_guard_1 = require("../auth/guards/auth.guard");
const guards_1 = require("../common/guards");
const decorators_1 = require("../common/decorators");
const role_auth_enum_1 = require("../common/enum/role.auth.enum");
let BranchController = class BranchController {
    client;
    constructor(client) {
        this.client = client;
    }
    async create(createBranchDto) {
        try {
            const createBranch = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'create_branch' }, createBranchDto));
            return createBranch;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async findAll() {
        try {
            const branches = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_all_branches' }, {}));
            return branches;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async findOne(id) {
        try {
            const branch = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_branch' }, { id: id }));
            return branch;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async update(id, updateBranchDto) {
        try {
            const updatedBranch = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update_branch' }, { id, ...updateBranchDto }));
            return updatedBranch;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
};
exports.BranchController = BranchController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_branch_dto_1.CreateBranchDto]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_branch_dto_1.UpdateBranchDto]),
    __metadata("design:returntype", Promise)
], BranchController.prototype, "update", null);
exports.BranchController = BranchController = __decorate([
    (0, common_1.Controller)('branch'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], BranchController);
//# sourceMappingURL=branch.controller.js.map
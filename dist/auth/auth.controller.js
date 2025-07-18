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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const config_1 = require("../config");
const dto_1 = require("./dto");
const auth_guard_1 = require("./guards/auth.guard");
const decorators_1 = require("./decorators");
const role_auth_enum_1 = require("../common/enum/role.auth.enum");
const decorators_2 = require("../common/decorators");
const guards_1 = require("../common/guards");
const update_user_dto_1 = require("./dto/update-user.dto");
let AuthController = class AuthController {
    client;
    constructor(client) {
        this.client = client;
    }
    async findAllUserBranch(id) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find.all.user.branch' }, id));
            return response;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async registerUser(registerUserDto) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'auth.register.user' }, registerUserDto));
            return response;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async updateUser(id, updateUserDto) {
        try {
            const payload = { ...updateUserDto, id };
            const response = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'auth.update.user' }, payload));
            return response;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async loginUser(loginUserDto) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'auth.login.user' }, loginUserDto));
            return response;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async verifyToken(user, token) {
        try {
            return { user, token };
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_2.Roles)(role_auth_enum_1.RoleAuthEnum.MANAGER, role_auth_enum_1.RoleAuthEnum.ADMIN),
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findAllUserBranch", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_2.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN, role_auth_enum_1.RoleAuthEnum.MANAGER),
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserchDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('verify'),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, decorators_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
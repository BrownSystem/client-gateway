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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const config_1 = require("../../config");
let AuthGuard = class AuthGuard {
    client;
    constructor(client) {
        this.client = client;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const isToken = this.extractTokenFromHeader(request);
        if (!isToken) {
            throw new common_1.UnauthorizedException('Token not found');
        }
        try {
            const { user, token } = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'auth.verify.token' }, isToken));
            request['user'] = user;
            request['token'] = token;
        }
        catch (error) {
            throw new microservices_1.RpcException({
                status: common_1.HttpStatus.BAD_REQUEST,
                message: error.message,
            });
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map
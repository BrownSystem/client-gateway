"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const common_1 = require("@nestjs/common");
exports.Token = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.token) {
        throw new common_1.InternalServerErrorException('[AuthGuard] Token not found in request');
    }
    return request.token;
});
//# sourceMappingURL=token.decorator.js.map
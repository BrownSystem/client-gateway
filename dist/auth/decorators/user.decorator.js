"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
        throw new common_1.InternalServerErrorException('[AuthGuard] User not found in request');
    }
    return request.user;
});
//# sourceMappingURL=user.decorator.js.map
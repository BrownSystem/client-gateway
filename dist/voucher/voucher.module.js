"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherModule = void 0;
const common_1 = require("@nestjs/common");
const voucher_controller_1 = require("./voucher.controller");
const nats_module_1 = require("../transports/nats.module");
let VoucherModule = class VoucherModule {
};
exports.VoucherModule = VoucherModule;
exports.VoucherModule = VoucherModule = __decorate([
    (0, common_1.Module)({
        imports: [nats_module_1.NatsModule],
        controllers: [voucher_controller_1.VoucherController],
    })
], VoucherModule);
//# sourceMappingURL=voucher.module.js.map
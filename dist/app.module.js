"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const products_module_1 = require("./products/products.module");
const nats_module_1 = require("./transports/nats.module");
const auth_module_1 = require("./auth/auth.module");
const brands_module_1 = require("./brands/brands.module");
const branch_module_1 = require("./branch/branch.module");
const branch_product_module_1 = require("./branch-product/branch-product.module");
const contacts_module_1 = require("./contacts/contacts.module");
const banks_module_1 = require("./banks/banks.module");
const voucher_module_1 = require("./voucher/voucher.module");
const notification_module_1 = require("./notification/notification.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            products_module_1.ProductsModule,
            nats_module_1.NatsModule,
            auth_module_1.AuthModule,
            brands_module_1.BrandsModule,
            branch_module_1.BranchModule,
            branch_product_module_1.BranchProductModule,
            contacts_module_1.ContactsModule,
            banks_module_1.BanksModule,
            voucher_module_1.VoucherModule,
            notification_module_1.NotificationModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
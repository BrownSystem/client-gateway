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
exports.ContactsController = void 0;
const common_1 = require("@nestjs/common");
const create_contact_dto_1 = require("./dto/create-contact.dto");
const config_1 = require("../config");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const dto_1 = require("./dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const guards_1 = require("../common/guards");
const decorators_1 = require("../common/decorators");
const role_auth_enum_1 = require("../common/enum/role.auth.enum");
let ContactsController = class ContactsController {
    client;
    constructor(client) {
        this.client = client;
    }
    async create(createContactDto) {
        try {
            const createContact = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'create_contact' }, createContactDto));
            return createContact;
        }
        catch (error) {
            throw new microservices_1.RpcException(`Failed to create contact: ${error.message}`);
        }
    }
    async findAll(paginationDto) {
        try {
            const createContact = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_all_contacts' }, paginationDto));
            return createContact;
        }
        catch (error) {
            throw new microservices_1.RpcException(`Failed to create contact: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            const contact = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find_one_contact' }, id));
            return contact;
        }
        catch (error) {
            throw new microservices_1.RpcException(error);
        }
    }
    async search(paginationDto) {
        try {
            const contacts = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'search_contacts' }, paginationDto));
            return contacts;
        }
        catch (error) {
            throw new microservices_1.RpcException(`Failed to search contacts: ${error.message}`);
        }
    }
};
exports.ContactsController = ContactsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(role_auth_enum_1.RoleAuthEnum.ADMIN, role_auth_enum_1.RoleAuthEnum.SELLER),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ContactsController.prototype, "search", null);
exports.ContactsController = ContactsController = __decorate([
    (0, common_1.Controller)('contacts'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ContactsController);
//# sourceMappingURL=contacts.controller.js.map
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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const create_notification_dto_1 = require("./dto/create-notification.dto");
const config_1 = require("../config");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const query_notification_dto_1 = require("./dto/query-notification.dto");
let NotificationsController = class NotificationsController {
    client;
    constructor(client) {
        this.client = client;
    }
    async create(dto) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'create-notification' }, dto));
        }
        catch (error) {
            throw new Error(`Failed to create notification: ${error.message}`);
        }
    }
    async findAll(query) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find-all-notification' }, query));
        }
        catch (error) {
            throw new Error(`Failed to fetch notifications: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'find-one-notification' }, id));
        }
        catch (error) {
            throw new Error(`Failed to find notification: ${error.message}`);
        }
    }
    async markAsRead(id) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'update-notification' }, { id, read: true }));
        }
        catch (error) {
            throw new Error(`Failed to mark as read: ${error.message}`);
        }
    }
    async softDelete(id) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'soft-delete-notification' }, id));
        }
        catch (error) {
            throw new Error(`Failed to delete notification: ${error.message}`);
        }
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_notification_dto_1.QueryNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "softDelete", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], NotificationsController);
//# sourceMappingURL=notification.controller.js.map
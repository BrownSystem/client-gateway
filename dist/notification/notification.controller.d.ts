import { CreateNotificationDto } from './dto/create-notification.dto';
import { ClientProxy } from '@nestjs/microservices';
import { QueryNotificationDto } from './dto/query-notification.dto';
export declare class NotificationsController {
    private readonly client;
    constructor(client: ClientProxy);
    create(dto: CreateNotificationDto): Promise<any>;
    findAll(query: QueryNotificationDto): Promise<any>;
    findOne(id: string): Promise<any>;
    markAsRead(id: string): Promise<any>;
    softDelete(id: string): Promise<any>;
}

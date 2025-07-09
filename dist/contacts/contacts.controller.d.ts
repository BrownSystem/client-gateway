import { CreateContactDto } from './dto/create-contact.dto';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from './dto';
export declare class ContactsController {
    private readonly client;
    constructor(client: ClientProxy);
    create(createContactDto: CreateContactDto): Promise<any>;
    findAll(paginationDto: PaginationDto): Promise<any>;
    findOne(id: string): Promise<any>;
    search(paginationDto: PaginationDto): Promise<any>;
}

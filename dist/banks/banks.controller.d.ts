import { UpdateBankDto } from './dto/update-bank.dto';
import { CreateBankDto } from './dto/create-back.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class BanksController {
    private readonly clientProxy;
    constructor(clientProxy: ClientProxy);
    create(createBankDto: CreateBankDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateBankDto: UpdateBankDto): Promise<any>;
}

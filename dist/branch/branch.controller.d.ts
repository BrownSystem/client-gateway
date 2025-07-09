import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class BranchController {
    private readonly client;
    constructor(client: ClientProxy);
    create(createBranchDto: CreateBranchDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateBranchDto: UpdateBranchDto): Promise<any>;
}

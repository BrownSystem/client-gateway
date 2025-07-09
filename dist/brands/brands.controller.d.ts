import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class BrandsController {
    private readonly client;
    constructor(client: ClientProxy);
    create(createBrandDto: CreateBrandDto): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateBrandDto: UpdateBrandDto): Promise<any>;
}

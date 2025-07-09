import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';
import { ICurrentUser } from './interfaces/current.user.interface';
export declare class AuthController {
    private readonly client;
    constructor(client: ClientProxy);
    findAllUser(id: string): Promise<any>;
    registerUser(registerUserDto: RegisterUserDto): Promise<any>;
    loginUser(loginUserDto: LoginUserDto): Promise<any>;
    verifyToken(user: ICurrentUser, token: string): Promise<{
        user: ICurrentUser;
        token: string;
    }>;
}

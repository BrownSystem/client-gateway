import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { ICurrentUser } from './interfaces/current.user.interface';
import { RoleAuthEnum } from 'src/common/enum/role.auth.enum';
import { Roles } from 'src/common/decorators';
import { RolesGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.MANAGER, RoleAuthEnum.ADMIN)
  @Get('users')
  async findAllUser() {
    try {
      const response = await firstValueFrom(
        this.client.send({ cmd: 'find.all.users' }, {}),
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.MANAGER, RoleAuthEnum.ADMIN)
  @Get('users/:id')
  async findAllUserBranch(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const response = await firstValueFrom(
        this.client.send({ cmd: 'find.all.user.branch' }, id),
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      const response = await firstValueFrom(
        this.client.send({ cmd: 'auth.register.user' }, registerUserDto),
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const response = await firstValueFrom(
        this.client.send({ cmd: 'auth.login.user' }, loginUserDto),
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verifyToken(@User() user: ICurrentUser, @Token() token: string) {
    try {
      return { user, token };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateBankDto } from './dto/update-bank.dto';
import { CreateBankDto } from './dto/create-back.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards';
import { RoleAuthEnum } from 'src/common/enum';
import { Roles } from 'src/common/decorators';

@Controller('banks')
export class BanksController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post()
  async create(@Body() createBankDto: CreateBankDto) {
    try {
      const createBank = await firstValueFrom(
        this.clientProxy.send({ cmd: 'create_bank' }, createBankDto),
      );

      return createBank;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const banks = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_all_banks' }, {}),
      );
      return banks;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const bank = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_one_banks' }, { id }),
      );
      return bank;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    try {
      const bank = await firstValueFrom(
        this.clientProxy.send({ cmd: 'update_bank' }, { id, ...updateBankDto }),
      );
      return bank;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

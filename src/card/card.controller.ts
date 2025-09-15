import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards';
import { RoleAuthEnum } from 'src/common/enum';
import { Roles } from 'src/common/decorators';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    try {
      const createCard = await firstValueFrom(
        this.clientProxy.send({ cmd: 'create_card' }, createCardDto),
      );

      return createCard;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const cards = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_all_cards' }, {}),
      );
      return cards;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const card = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_one_card' }, { id }),
      );
      return card;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    try {
      const card = await firstValueFrom(
        this.clientProxy.send({ cmd: 'update_card' }, { id, ...updateCardDto }),
      );
      return card;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

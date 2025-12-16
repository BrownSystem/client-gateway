import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Roles } from 'src/common/decorators';
import { RoleAuthEnum } from 'src/common/enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards';

@Controller('check-book')
export class CheckBookController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Get()
  async findAll() {
    try {
      const checkBook = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_all_check_books' }, {}),
      );
      return checkBook;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN)
  @Delete('delete/:id')
  async deleteCheckbook(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const deleteCheque = await firstValueFrom(
        this.clientProxy.send({ cmd: 'delete_check_book' }, { id }),
      );
      return deleteCheque;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

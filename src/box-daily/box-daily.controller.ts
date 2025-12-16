import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  UseGuards,
  Query,
} from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards';
import { RoleAuthEnum } from 'src/common/enum';
import { Roles } from 'src/common/decorators';
import { OpenBoxDailyDto } from './dto/open-box-daily.dto';
import { ClosedBoxDailyDto } from './dto/closed-box-daily.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ReopenBoxDailyDto } from './dto/reopen-box-daily.dto';
import { FilterExpenseDto } from './dto/filter-expense.dto';

@Controller('box-daily')
export class BoxDailyController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Get()
  async findAllBoxDaily(@Query() paginationDto: PaginationDto) {
    try {
      const boxDailies = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_all_box_daily' }, paginationDto),
      );
      return boxDailies;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Get('id/:id')
  async findOneBoxDaily(@Param('id') id: string) {
    try {
      const boxDailyId = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_one_box_daily' }, { id }),
      );
      return boxDailyId;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post('open')
  async OpenBoxDaily(@Body() openBoxDailyDto: OpenBoxDailyDto) {
    try {
      const openBoxDaily = await firstValueFrom(
        this.clientProxy.send({ cmd: 'open_box_daily' }, openBoxDailyDto),
      );

      return openBoxDaily;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Patch('closed/:id')
  async closedBoxDaily(
    @Param('id') id: string,
    @Body() closedBoxDailyDto: ClosedBoxDailyDto,
  ) {
    try {
      const closedBoxDaily = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'closed_box_daily' },
          { id, ...closedBoxDailyDto },
        ),
      );
      return closedBoxDaily;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Patch('reopen/:id')
  async reopenBoxDaily(
    @Param('id') id: string,
    @Body() reopenBoxDailyDto: ReopenBoxDailyDto,
  ) {
    try {
      const reopenBoxDaily = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'reopen_box_daily' },
          { id, ...reopenBoxDailyDto },
        ),
      );
      return reopenBoxDaily;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // ANALISIS DE DATOS
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Get('expenses')
  async findExpensesByBranchAndDate(@Query() filterDto: FilterExpenseDto) {
    try {
      const expenses = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'find_expenses_by_branch_and_date' },
          filterDto,
        ),
      );
      return expenses;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

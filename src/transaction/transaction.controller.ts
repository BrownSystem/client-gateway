import {
  Controller,
  Post,
  Body,
  Inject,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards';
import { RoleAuthEnum } from 'src/common/enum';
import { Roles } from 'src/common/decorators';
import { ExpenseByCategory } from './dto/expense/expense-by-category.dto';
import { ExpenseEmployeedDto } from './dto/expense/expense-employeed.dto';
import { ExpenseSupplierDto } from './dto/expense/expense-supplier.dto';
import { ExpenseTransferBranchDto } from './dto/expense/expense-transfer-branch.dto';
import { IncomeSaleDto } from './dto/income/income-sale.dto';
import { IncomeTransferBranchDto } from './dto/income/income-transfer-branch.dto';
import { ParseStringPipe } from 'src/common/pipes';

@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Get('get-income-by-payment-method/:branchId')
  async getIncomeByPaymentMethod(
    @Param('branchId', ParseStringPipe) branchId: string,
  ) {
    try {
      const get = await firstValueFrom(
        this.clientProxy.send(
          {
            cmd: 'get_income_by_payment_method',
          },
          { branchId },
        ),
      );
      return get;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post('expense-by-category')
  async expenseByCategory(@Body() expenseByCategory: ExpenseByCategory) {
    try {
      const expense = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'expense_by_category' },
          expenseByCategory,
        ),
      );

      return expense;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post('expense-employeed')
  async expenseEmployeed(@Body() expenseEmployeedDto: ExpenseEmployeedDto) {
    try {
      const expense = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'expense_employeed' },
          expenseEmployeedDto,
        ),
      );

      return expense;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post('expense-supplier')
  async expenseSupplier(@Body() expenseSupplierDto: ExpenseSupplierDto) {
    try {
      const expense = await firstValueFrom(
        this.clientProxy.send({ cmd: 'expense_supplier' }, expenseSupplierDto),
      );

      return expense;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post('expense-trasnfer-branch')
  async expenseTransferBranch(
    @Body() expenseTransferBranchDto: ExpenseTransferBranchDto,
  ) {
    try {
      const expense = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'expense_trasnfer_branch' },
          expenseTransferBranchDto,
        ),
      );

      return expense;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post('income-sale')
  async incomeSale(@Body() incomeSaleDto: IncomeSaleDto) {
    try {
      const income = await firstValueFrom(
        this.clientProxy.send({ cmd: 'income_sale' }, incomeSaleDto),
      );

      return income;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post('income-transfer-branch')
  async incomeTransferBranch(
    @Body() incomeTransferBranch: IncomeTransferBranchDto,
  ) {
    try {
      const income = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'income_transfer_branch' },
          incomeTransferBranch,
        ),
      );

      return income;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Delete('/:id')
  async deleteTransaction(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send({ cmd: 'transaction_deletion' }, { id }),
      );

      return {
        success: true,
        data: response?.data || response,
        message: response?.message || 'Pago eliminado correctamente.',
      };
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al eliminar el pago: ${error.message}`,
      );
    }
  }
}

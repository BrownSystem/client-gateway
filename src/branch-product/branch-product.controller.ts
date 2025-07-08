import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  ParseUUIDPipe,
  Query,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards';
import { RoleAuthEnum } from 'src/common/enum/role.auth.enum';
import { Roles } from 'src/common/decorators';
import { firstValueFrom } from 'rxjs';
import { ManipulateStockDto } from './dto/manipulate-stock.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Response } from 'express';

@Controller('inventory')
export class BranchProductController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get('excel')
  async generatedFullInventory(@Res() res: Response) {
    try {
      const bufferObject = await firstValueFrom(
        this.client.send({ cmd: 'generated_full_inventary_in_excel' }, {}),
      );

      const buffer = Buffer.from(bufferObject.data);

      res.set({
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition':
          'attachment; filename="inventario_completo.xlsx"',
        'Content-Length': buffer.length,
      });

      res.end(buffer);
    } catch (error) {
      throw new RpcException(
        'Failed to download inventory file: ' + error.message,
      );
    }
  }

  @Get('products')
  async getProductsByBranchId(@Query() paginationDto: PaginationDto) {
    try {
      const branch = await firstValueFrom(
        this.client.send({ cmd: 'find_all_stock_branch' }, paginationDto),
      );
      return branch;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('products-out-of-stock')
  async outOfStock(@Query() paginationDto: PaginationDto) {
    try {
      const branch = await firstValueFrom(
        this.client.send({ cmd: 'find_out_of_stock_branch' }, paginationDto),
      );
      return branch;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN)
  @Patch('increase-stock/:branchProductId')
  async increaseBranchProductStock(
    @Param('branchProductId', ParseUUIDPipe) branchProductId: string,
    @Body() manipulateStockDto: ManipulateStockDto,
  ) {
    try {
      const { quantity } = manipulateStockDto;

      const updatedInventory = await firstValueFrom(
        this.client.send(
          { cmd: 'increase_branch_product_stock' },
          { id: branchProductId, stock: quantity },
        ),
      );

      return updatedInventory;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN)
  @Patch('descrease-stock/:branchProductId')
  async descreaseBranchProductStock(
    @Param('branchProductId', ParseUUIDPipe) branchProductId: string,
    @Body() manipulateStockDto: ManipulateStockDto,
  ) {
    try {
      const { quantity } = manipulateStockDto;

      const updatedInventory = await firstValueFrom(
        this.client.send(
          { cmd: 'descrease_branch_product_stock' },
          { id: branchProductId, stock: quantity },
        ),
      );

      return updatedInventory;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

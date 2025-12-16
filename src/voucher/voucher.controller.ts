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
  Query,
  Res,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards';
import { RoleAuthEnum } from 'src/common/enum';
import { Roles } from 'src/common/decorators';
import { PaginationDto } from './dto/pagination.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdateVoucherProductItemDto } from './dto/voucher-product-item.dto';
import { Response } from 'express';
import { GenerateNumberVoucherDto } from './dto/generate-number.dto';
import { DeleteVoucherDto } from './dto/delete-voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post()
  async create(@Body() createVoucherDto: CreateVoucherDto) {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send({ cmd: 'create_voucher' }, createVoucherDto),
      );

      return {
        success: true,
        data: response?.data || response,
        message: response?.message || 'Comprobante registrado correctamente.',
      };
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al crear el comprobante: ${error.message}`,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post('register-payment')
  async registerPayment(@Body() paymentDto: CreatePaymentDto) {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send({ cmd: 'register_payment' }, paymentDto),
      );

      return {
        success: true,
        data: response?.data || response,
        message: response?.message || 'Pago registrado correctamente.',
      };
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al registrar el pago: ${error.message}`,
      );
    }
  }

  @Get('search')
  async searchVoucher(@Query() pagination: PaginationDto) {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'find_all_vouchers_condition_payment' },
          pagination,
        ),
      );
      return response;
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al obtener las condiciones de pago: ${error.message}`,
      );
    }
  }

  @Get('search-by-contact')
  async searchVoucherByContact(@Query() pagination: PaginationDto) {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'find_all_vouchers_by_contact' },
          pagination,
        ),
      );
      return response;
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al obtener las deudas de pago: ${error.message}`,
      );
    }
  }

  @Get('sales-monthly-by-branch')
  async findSalesMonthlyByBranch(
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'find_monthly_sales_by_branch' },
          { month, year },
        ),
      );
      return response;
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al obtener ventas por mes: ${error.message}`,
      );
    }
  }

  @Get('sales-by-branch')
  async findSalesByBranch(@Query('branchId') branchId: string) {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_sales_by_branch' }, { branchId }),
      );
      return response;
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al obtener ventas por sucursal: ${error.message}`,
      );
    }
  }

  @Get('reserved')
  async findAllReservedProductsByBranchId(@Query() pagination: PaginationDto) {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'find_all_reserved_products' },
          pagination,
        ),
      );
      return response;
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al obtener los productos reservados: ${error.message}`,
      );
    }
  }

  @Get('html/:id') // opcionalmente cambiá a 'html/:id'
  @Header('Content-Type', 'text/html')
  async generateHtml(
    @Param('id') id: string,
    @Query('download') download: string,
    @Res() res: Response,
  ) {
    try {
      const html = await firstValueFrom(
        this.clientProxy.send({ cmd: 'generate_voucher_html' }, id),
      );

      res.setHeader(
        'Content-Disposition',
        `${download === 'true' ? 'attachment' : 'inline'}; filename=comprobante-${id}.html`,
      );

      return res.status(HttpStatus.OK).send(html);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'No se pudo generar el comprobante.' });
    }
  }

  @Get('one/:id')
  async findOneVoucher(@Param('id') id: string) {
    try {
      const voucher = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_one_voucher' }, { id }),
      );

      return voucher;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post('generate-number')
  async generateNumber(@Body() dto: GenerateNumberVoucherDto) {
    try {
      const numberOfVoucher = await firstValueFrom(
        this.clientProxy.send({ cmd: 'generate_number_voucher' }, dto),
      );
      return numberOfVoucher;
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al obtener el numero de comprobante ${error}`,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Patch('reserved-update/:id')
  async updateReservedProduct(
    @Param('id') id: string,
    @Body() updateVoucherProductItemDto: UpdateVoucherProductItemDto,
  ) {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'update_reserved_product' },
          { id, data: updateVoucherProductItemDto },
        ),
      );
      return response;
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al actualizar el producto reservado: ${error.message}`,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post('delete-product/:id')
  async deleteProduct(
    @Param('id') id: string,
    @Body() typeDeleteDto: DeleteVoucherDto,
  ) {
    try {
      const { typeOfDelete } = typeDeleteDto;
      const response = await firstValueFrom(
        this.clientProxy.send({ cmd: 'type_delete' }, { id, typeOfDelete }),
      );
      return response;
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al eliminar el producto: ${error.message}`,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Delete('delete-all')
  async deleteProductAll() {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send({ cmd: 'delete' }, {}),
      );
      return response;
    } catch (error) {
      throw new RpcException(
        `[GATEWAY] Error al eliminar el producto: ${error.message}`,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Delete('delete-payment/:id')
  async deletePayment(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.clientProxy.send({ cmd: 'delete_payment' }, { id }),
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

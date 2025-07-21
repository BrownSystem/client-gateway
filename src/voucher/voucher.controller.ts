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
} from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
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

@Controller('voucher')
export class VoucherController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
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

  @Get('pdf/:id')
  async generatePdf(
    @Param('id') id: string,
    @Query('download') download: string,
    @Res() res: Response,
  ) {
    try {
      const rawBuffer = await firstValueFrom(
        this.clientProxy.send({ cmd: 'generate_voucher_pdf' }, id),
      );

      const buffer = Buffer.isBuffer(rawBuffer)
        ? rawBuffer
        : Buffer.from(rawBuffer.data);

      // Verificación (opcional pero útil)
      console.log('Buffer length:', buffer.length);
      console.log('First 4 bytes:', buffer.slice(0, 4));

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `${download === 'true' ? 'attachment' : 'inline'}; filename=comprobante-${id}.pdf`,
      );

      return res.status(HttpStatus.OK).send(buffer);
    } catch (error) {
      console.error('Error al generar o enviar el PDF:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'No se pudo generar el PDF del comprobante.' });
    }
  }

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
}

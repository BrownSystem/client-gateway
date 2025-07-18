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
}

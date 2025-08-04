import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IProductsController, PaginationDto } from 'src/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NATS_SERVICE } from 'src/config';
import { ParseStringPipe } from 'src/common/pipes';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators';
import { RoleAuthEnum } from 'src/common/enum/role.auth.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseExcelFile } from './utils/parseExcelFile';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { PrintQrDto } from './dto/print-qr.dto';

@Controller('products')
export class ProductsController implements IProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const createProducts = await firstValueFrom(
        this.client.send({ cmd: 'create_product' }, createProductDto),
      );
      return createProducts;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const rows = parseExcelFile(file.buffer);
      const upload = await firstValueFrom(
        this.client.send({ cmd: 'upload_products_with_file' }, rows),
      );
      return upload;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('download-pdf-qrs')
  async printQrs(@Body() body: PrintQrDto, @Res() res: Response) {
    try {
      const pdfBase64: string = await firstValueFrom(
        this.client.send({ cmd: 'generate_pdf_file_with_qrs' }, body.products),
      );

      const pdfBuffer = Buffer.from(pdfBase64, 'base64');

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="qrs.pdf"',
      });
      const outputPath = path.join(__dirname, '../../test-output.pdf');
      fs.writeFileSync(outputPath, pdfBuffer);
      res.send(pdfBuffer);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('download-pdf-products')
  async downloadProductsWithPdf(
    @Body() body: PrintQrDto,
    @Res() res: Response,
  ) {
    try {
      const pdfBase64: string = await firstValueFrom(
        this.client.send({ cmd: 'generate_pdf_with_products' }, body.products),
      );

      const pdfBuffer = Buffer.from(pdfBase64, 'base64');

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="qrs.pdf"',
      });
      const outputPath = path.join(__dirname, '../../test-output.pdf');
      fs.writeFileSync(outputPath, pdfBuffer);
      res.send(pdfBuffer);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAllProducts(@Query() paginationDto: PaginationDto) {
    try {
      const findAll = await firstValueFrom(
        this.client.send({ cmd: 'find_all_product' }, paginationDto),
      );
      return findAll;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('search')
  async findProductsBySearch(@Query() paginationDto: PaginationDto) {
    try {
      const findProducts = await firstValueFrom(
        this.client.send({ cmd: 'search_products' }, paginationDto),
      );
      return findProducts;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('by-branches')
  async SearchProductsWithAllBranch(@Query() paginationDto: PaginationDto) {
    try {
      const findProducts = await firstValueFrom(
        this.client.send(
          { cmd: 'search_products_with_all_branch_inventory' },
          paginationDto,
        ),
      );
      return findProducts;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.SELLER)
  @Patch('update/:id')
  async updateProduct(
    @Param('id', ParseStringPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const updateProduct = await firstValueFrom(
        this.client.send(
          { cmd: 'update_product' },
          {
            id,
            ...updateProductDto,
          },
        ),
      );
      return updateProduct;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('delete-all')
  async delete() {
    try {
      const deleteProducts = await firstValueFrom(
        this.client.send({ cmd: 'delete-all-products' }, {}),
      );
      return deleteProducts;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

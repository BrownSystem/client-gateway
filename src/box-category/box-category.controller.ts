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
import { CreateBoxCategoryDto } from './dto/create-box-category.dto';
import { UpdateBoxCategoryDto } from './dto/update-box-category.dto';

@Controller('box-category')
export class BoxCategoryController {
  constructor(
    @Inject(NATS_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Post()
  async create(@Body() createBoxCategoryDto: CreateBoxCategoryDto) {
    try {
      const createboxCategory = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'create_box_category' },
          createBoxCategoryDto,
        ),
      );

      return createboxCategory;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const boxCategories = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_all_box_category' }, {}),
      );
      return boxCategories;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    try {
      const boxCategoryId = await firstValueFrom(
        this.clientProxy.send({ cmd: 'find_one_box_category' }, { id }),
      );
      return boxCategoryId;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.MANAGER)
  @Patch('id/:id')
  async update(
    @Param('id') id: string,
    @Body() updateBoxCategoryDto: UpdateBoxCategoryDto,
  ) {
    try {
      const updateBoxCategory = await firstValueFrom(
        this.clientProxy.send(
          { cmd: 'update_box_category' },
          { id, ...updateBoxCategoryDto },
        ),
      );
      return updateBoxCategory;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

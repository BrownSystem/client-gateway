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
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators';
import { RoleAuthEnum } from 'src/common/enum/role.auth.enum';

@Controller('branch')
export class BranchController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createBranchDto: CreateBranchDto) {
    try {
      const createBranch = await firstValueFrom(
        this.client.send({ cmd: 'create_branch' }, createBranchDto),
      );
      return createBranch;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      const branches = await firstValueFrom(
        this.client.send({ cmd: 'find_all_branches' }, {}),
      );
      return branches;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const branch = await firstValueFrom(
        this.client.send({ cmd: 'find_one_branch' }, { id: id }),
      );
      return branch;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN)
  @Patch('update/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    try {
      const updatedBranch = await firstValueFrom(
        this.client.send({ cmd: 'update_branch' }, { id, ...updateBranchDto }),
      );
      return updatedBranch;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from './dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators';
import { RoleAuthEnum } from 'src/common/enum/role.auth.enum';

@Controller('contacts')
export class ContactsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleAuthEnum.ADMIN, RoleAuthEnum.SELLER)
  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    try {
      const createContact = await firstValueFrom(
        this.client.send({ cmd: 'create_contact' }, createContactDto),
      );
      return createContact;
    } catch (error) {
      throw new RpcException(`Failed to create contact: ${error.message}`);
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      const createContact = await firstValueFrom(
        this.client.send({ cmd: 'find_all_contacts' }, paginationDto),
      );
      return createContact;
    } catch (error) {
      throw new RpcException(`Failed to create contact: ${error.message}`);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const contact = await firstValueFrom(
        this.client.send({ cmd: 'find_one_contact' }, id),
      );
      return contact;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('search')
  async search(@Query() paginationDto: PaginationDto) {
    try {
      const contacts = await firstValueFrom(
        this.client.send({ cmd: 'search_contacts' }, paginationDto),
      );
      return contacts;
    } catch (error) {
      throw new RpcException(`Failed to search contacts: ${error.message}`);
    }
  }
}

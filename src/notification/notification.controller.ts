import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueryNotificationDto } from './dto/query-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() dto: CreateNotificationDto) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'create-notification' }, dto),
      );
    } catch (error) {
      throw new Error(`Failed to create notification: ${error.message}`);
    }
  }

  @Get()
  async findAll(@Query() query: QueryNotificationDto) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'find-all-notification' }, query),
      );
    } catch (error) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'find-one-notification' }, id),
      );
    } catch (error) {
      throw new Error(`Failed to find notification: ${error.message}`);
    }
  }

  @Patch(':id/read')
  async markAsRead(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'update-notification' }, { id, read: true }),
      );
    } catch (error) {
      throw new Error(`Failed to mark as read: ${error.message}`);
    }
  }

  @Delete(':id')
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.client.send({ cmd: 'soft-delete-notification' }, id),
      );
    } catch (error) {
      throw new Error(`Failed to delete notification: ${error.message}`);
    }
  }
}

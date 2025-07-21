import { Module } from '@nestjs/common';
import { NotificationsController } from './notification.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [NotificationsController],
})
export class NotificationModule {}

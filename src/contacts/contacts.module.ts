import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [ContactsController],
})
export class ContactsModule {}

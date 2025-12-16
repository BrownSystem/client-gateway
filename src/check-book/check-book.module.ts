import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { CheckBookController } from './check-book.controller';

@Module({
  imports: [NatsModule],
  controllers: [CheckBookController],
})
export class CheckBookModule {}

import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [NatsModule],
  controllers: [TransactionController],
})
export class TransactionModule {}

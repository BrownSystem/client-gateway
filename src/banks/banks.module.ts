import { Module } from '@nestjs/common';
import { BanksController } from './banks.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [BanksController],
})
export class BanksModule {}

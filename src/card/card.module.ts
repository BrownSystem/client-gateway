import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { CardController } from './card.controller';

@Module({
  imports: [NatsModule],
  controllers: [CardController],
})
export class CardModule {}

import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { BoxDailyController } from './box-daily.controller';

@Module({
  imports: [NatsModule],
  controllers: [BoxDailyController],
})
export class BoxDailyModule {}

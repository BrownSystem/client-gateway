import { Module } from '@nestjs/common';
import { BranchProductController } from './branch-product.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [BranchProductController],
})
export class BranchProductModule {}

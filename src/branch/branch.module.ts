import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [BranchController],
})
export class BranchModule {}

import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { BoxCategoryController } from './box-category.controller';

@Module({
  imports: [NatsModule],
  controllers: [BoxCategoryController],
})
export class BoxCategoryModule {}

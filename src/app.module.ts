import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { BranchModule } from './branch/branch.module';
import { BranchProductModule } from './branch-product/branch-product.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ProductsModule,
    NatsModule,
    AuthModule,
    BrandsModule,
    BranchModule,
    BranchProductModule,
    ContactsModule,
  ],
})
export class AppModule {}

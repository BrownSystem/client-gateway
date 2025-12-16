import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { BranchModule } from './branch/branch.module';
import { BranchProductModule } from './branch-product/branch-product.module';
import { ContactsModule } from './contacts/contacts.module';
import { BanksModule } from './banks/banks.module';
import { VoucherModule } from './voucher/voucher.module';
import { NotificationModule } from './notification/notification.module';
import { CardModule } from './card/card.module';
import { BoxCategoryModule } from './box-category/box-category.module';
import { BoxDailyModule } from './box-daily/box-daily.module';
import { TransactionModule } from './transaction/transaction.module';
import { CheckBookModule } from './check-book/check-book.module';

@Module({
  imports: [
    ProductsModule,
    NatsModule,
    AuthModule,
    BrandsModule,
    BranchModule,
    BranchProductModule,
    ContactsModule,
    BanksModule,
    VoucherModule,
    NotificationModule,
    CardModule,
    BoxCategoryModule,
    BoxDailyModule,
    TransactionModule,
    CheckBookModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { BackOfficeController } from './backOffice.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

import { UserLoginModule } from '../user-login/user-login.module';
import { UserCustomerModule } from '../user-customer/user-customer.module';
import { UserWorkerModule } from '../user-worker/user-worker.module';
import { TowerModule } from '../tower/tower.module';
import { ProductModule } from '../product/product.module';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { OrderModule } from '../order/order.module';
import { CartDetailModule } from '../cart-detail/cart-detail.module';
import { UserWorkerLoginModule } from '../user-worker-login/user-worker-login.module';
import { UserWorkerRoleModule } from '../user-worker-role/user-worker-role.module';
import { ProductCategoryModule } from '../product-category/product-category.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserLoginModule,
    UserCustomerModule,
    UserWorkerModule,
    TowerModule,
    ProductModule,
    OrderDetailModule,
    OrderModule,
    CartDetailModule,
    UserWorkerLoginModule,
    UserWorkerRoleModule,
    ProductCategoryModule,
  ],
  controllers: [BackOfficeController],
  providers: [],
  exports: [],
})
export class BackOfficeModule {}

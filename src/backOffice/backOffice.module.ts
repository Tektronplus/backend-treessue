import { Module } from '@nestjs/common';
import {BackOfficeController} from './backOffice.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

import { UserLoginModule } from 'src/user-login/user-login.module';
import { UserCustomerModule } from 'src/user-customer/user-customer.module';
import { UserWorkerModule } from 'src/user_worker/user_worker.module';
import { TowerModule } from 'src/tower/tower.module';
import { ProductModule } from 'src/product/product.module';
import { OrderDetailModule } from 'src/order-detail/order-detail.module';
import { OrderModule } from 'src/order/order.module';
import { DiscountModule } from 'src/discount/discount.module';
import { CartDetailModule } from 'src/cart-detail/cart-detail.module';


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
    DiscountModule,
    CartDetailModule
  ],
  controllers: [BackOfficeController],
  providers: [],
  exports: [],
})
export class BackOfficeModule {}

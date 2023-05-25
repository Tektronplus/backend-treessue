import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserLoginModule } from './user-login/user-login.module';
import { OrderModule } from './order/order.module';
import { TowerModule } from './tower/tower.module';
import { CartDetailModule } from './cart-detail/cart-detail.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { BackOfficeModule } from './backOffice/backOffice.module';
import { UserWorkerLoginModule } from './user-worker-login/user-worker-login.module';
import { UserWorkerRoleModule } from './user-worker-role/user-worker-role.module';
import { ProductCategoryModule } from './product-category/product-category.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // To use dot env globally
    ProductModule,
    AuthModule,
    UserLoginModule,
    OrderModule,
    TowerModule,
    CartDetailModule,
    OrderDetailModule,
    BackOfficeModule,
    UserWorkerLoginModule,
    UserWorkerRoleModule,
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

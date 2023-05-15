import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserLoginModule } from './user-login/user-login.module';
import { OrderModule } from './order/order.module';
import { UserWorkerModule } from './user_worker/user_worker.module';
import { TowerModule } from './tower/tower.module';
import { DiscountModule } from './discount/discount.module';
import { CartDetailModule } from './cart-detail/cart-detail.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // To use dot env globally
    ProductModule,
    AuthModule,
    UserLoginModule,
    OrderModule,
    UserWorkerModule,
    TowerModule,
    DiscountModule,
    CartDetailModule,
    OrderDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

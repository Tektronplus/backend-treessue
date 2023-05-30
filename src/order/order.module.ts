import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderProvider } from './order.providers';
import { DatabaseModule } from '../database/database.module';
import { CartDetailModule } from '../cart-detail/cart-detail.module';
import { AuthModule } from '../auth/auth.module';
import { OrderStatusModule } from '../order-status/order-status.module';
import { ProductModule } from '../product/product.module';
import { OrderDetailModule } from '../order-detail/order-detail.module';

@Module({
  imports: [
    DatabaseModule,
    CartDetailModule,
    AuthModule,
    OrderStatusModule,
    ProductModule,
    OrderDetailModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, ...OrderProvider],
  exports: [OrderService],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderProvider } from './order.providers';
import { DatabaseModule } from '../database/database.module';
import { CartDetailModule } from '../cart-detail/cart-detail.module';

@Module({
  imports: [DatabaseModule,CartDetailModule],
  controllers: [OrderController],
  providers: [OrderService, ...OrderProvider],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderProvider } from './order.providers';
import { DatabaseModule } from '../database/database.module';
import { CartDetailModule } from '../cart-detail/cart-detail.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule,CartDetailModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService, ...OrderProvider],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { CartDetailController } from './cart-detail.controller';
import { CartDetailService } from './cart-detail.service';
import { cartDetailProvider } from './cart-detail.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [DatabaseModule, AuthModule, ProductModule],
  controllers: [CartDetailController],
  providers: [CartDetailService, ...cartDetailProvider],
  exports: [CartDetailService],
})
export class CartDetailModule {}

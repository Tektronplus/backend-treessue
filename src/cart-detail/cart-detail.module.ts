import { Module } from '@nestjs/common';
import { CartDetailController } from './cart-detail.controller';
import { CartDetailService } from './cart-detail.service';
import { cartDetailProvider } from './cart-detail.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CartDetailController],
  providers: [CartDetailService, ...cartDetailProvider],
})
export class CartDetailModule {}

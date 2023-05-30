import { Module } from '@nestjs/common';
import { OrderDetailController } from './order-detail.controller';
import { OrderDetailService } from './order-detail.service';
import { orderDetailProvider } from './order-detail.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderDetailController],
  providers: [OrderDetailService, ...orderDetailProvider],
  exports: [OrderDetailService],
})
export class OrderDetailModule {}

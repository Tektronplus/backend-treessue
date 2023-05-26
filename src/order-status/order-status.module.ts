import { Module } from '@nestjs/common';
import { OrderStatusController } from './order-status.controller';
import { OrderStatusService } from './order-status.service';
import { orderStatusProvider } from './order-status.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [OrderStatusController],
  providers: [OrderStatusService, ...orderStatusProvider],
  exports: [OrderStatusService],
})
export class OrderStatusModule {}

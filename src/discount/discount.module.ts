import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { discountProvider } from './discount.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DiscountController],
  providers: [DiscountService, ...discountProvider],
})
export class DiscountModule {}

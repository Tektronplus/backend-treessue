import { Controller, Get, UseGuards } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Discount!';
  }

  @Get('/all')
  async getListDiscount(): Promise<Array<any>> {
    return this.discountService.findAll();
  }
}

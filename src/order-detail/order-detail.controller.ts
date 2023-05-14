import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Order Detail!';
  }

  @Get('/all')
  async getListOrderDetail(): Promise<Array<any>> {
    return this.orderDetailService.findAll();
  }
}

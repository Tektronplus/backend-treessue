import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from order!';
  }

  @Get('/all')
  async getListOrders(): Promise<Array<any>> {
    return this.OrderService.findAll();
  }
}

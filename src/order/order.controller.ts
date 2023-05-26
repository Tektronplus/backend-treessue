import {
  Controller,
  Get,
  Headers,
  Res,
  UseGuards,
  Put,
  Body,
  Post
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Order!';
  }

  @Get('/all')
  async getListOrders(): Promise<Array<any>> {
    return this.orderService.findAll();
  }

  @Post('/creteOrder')
  async createNewOrder(): Promise<Array<any>> {
    return this.orderService.findAll();
  }
}

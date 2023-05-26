import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  //--- READ ---
  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Product Category!';
  }
}

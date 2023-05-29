import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  //--- CREATE ---
  @Post('/create')
  async createOrderStatus(@Headers() headers, @Body() body): Promise<any> {
    return this.orderStatusService.createNewOrderStatus(headers, body);
  }

  //--- READ ---
  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Product Category!';
  }

  @Get('/all')
  async getListOrderStatus(@Headers() headers): Promise<Array<any>> {
    return this.orderStatusService.findAll(headers);
  }

  //--- UPDATE ---
  @Put('/update/:idOrderStatus')
  async updateOrderStatusById(
    @Param() param,
    @Headers() headers,
    @Body() body,
  ): Promise<any> {
    return this.orderStatusService.updateOrderStatusById(
      param.idOrderStatus,
      headers,
      body,
    );
  }

  //--- DELETE ---
  @Delete('/delete/:idOrderStatus')
  async deleteOrderStatusById(
    @Param() param,
    @Headers() headers,
  ): Promise<any> {
    return this.orderStatusService.deleteOrderStatusyById(
      param.idOrderStatus,
      headers,
    );
  }
}

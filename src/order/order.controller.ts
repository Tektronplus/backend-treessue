import {
  Controller,
  Get,
  Headers,
  Res,
  UseGuards,
  Put,
  Body,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CartDetailService } from '../cart-detail/cart-detail.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartDetailService: CartDetailService,
  ) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Order!';
  }

  @Get('/all')
  async getListOrders(): Promise<Array<any>> {
    return this.orderService.findAll();
  }

  @Post('/createOrder')
  async createNewOrder(
    @Headers() headers,
    @Body() body,
    @Res() res,
  ): Promise<any> {
    const customerCart =
      await this.cartDetailService.findCartDetailByUserCustomer(headers);
    console.log({ customerCart });
    if (customerCart.length !== 0) {
      return 'ciao';
    } else {
      res.status(200).json({ result: 'non ci sono prodotti nel carello' });
    }
  }
}

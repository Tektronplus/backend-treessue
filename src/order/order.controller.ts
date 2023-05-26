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
import { AuthService } from '../auth/auth.service';

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
    const userDetail = await this.authService.dechiperUserToken(
      headers.authorization.split('Bearer ')[1],
    );
    await this.cartDetailService.deleteCartByIdUserCustomer(
      userDetail.userDetail.id,
    );
    console.log({ customerCart });
    let newOrderEntity = {
      id_user_customer: userDetail.userDetail.id,
      id_user_worker: '',
      order_date: Date.now(),
    };
    console.log({ newOrderEntity });
    if (customerCart.length !== 0) {
      return 'ciao';
    } else {
      res.status(200).json({ result: 'non ci sono prodotti nel carello' });
    }
  }
}

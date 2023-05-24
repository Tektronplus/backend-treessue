import {
  Controller,
  Get,
  UseGuards,
  Headers,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { CartDetailService } from './cart-detail.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('cart-detail')
export class CartDetailController {
  constructor(private readonly cartDetailService: CartDetailService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Cart Detail!';
  }

  @Get('/all')
  async getListCartDetail(): Promise<Array<any>> {
    return this.cartDetailService.findAll();
  }

  @Get('/customer')
  async getCartdetailOfUserCustomer(@Headers() headers): Promise<Array<any>> {
    return this.cartDetailService.findCartDetailByUserCustomer(headers);
  }

  @Post('/add')
  async getToken(@Body() body, @Headers() headers): Promise<any> {
    return this.cartDetailService.addItemToCart(
      headers,
      body.idProduct,
      body.quantity,
    );
  }

  @Delete('/delete-item')
  async deleteItemFromCart(@Headers() headers, @Body() body): Promise<any> {
    return this.cartDetailService.deleteCartDetailItemById(headers, body);
  }
}

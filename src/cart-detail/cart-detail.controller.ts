import { Controller, Get, UseGuards } from '@nestjs/common';
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
}

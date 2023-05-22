import {
  Controller,
  Get,
  UseGuards,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { CartDetailService } from './cart-detail.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from '../auth/auth.service';

@UseGuards(ApiKeyAuthGuard)
@Controller('cart-detail')
export class CartDetailController {
  constructor(
    private readonly cartDetailService: CartDetailService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Cart Detail!';
  }

  @Get('/all')
  async getListCartDetail(): Promise<Array<any>> {
    return this.cartDetailService.findAll();
  }

  @Get('/customer')
  async getCartdetailOfUserCustomer(): Promise<Array<any>> {
    return this.cartDetailService.findCartDetailByUserCustomer(4);
  }

  @Post('/add')
  async getToken(@Body() body, @Headers() headers): Promise<any> {
    type decodedToken = {
      userDetail?: any;
      exp?: number;
      iat?: number;
    };

    const authorizationToker = headers.authorization.split('Bearer ')[1];
    const isTokenValid = await this.authService.validateToken(
      authorizationToker,
    );

    console.log({ isTokenValid });
    const decodedInfo: decodedToken = await this.authService.dechiperUserToken(
      authorizationToker,
    );
    const userInfo = decodedInfo.userDetail;

    console.log(userInfo.id);
    return this.cartDetailService.addItemToCart(
      userInfo.id,
      body.idProduct,
      body.quantity,
    );
  }
}

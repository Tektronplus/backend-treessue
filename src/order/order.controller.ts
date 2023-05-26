
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
import { OrderStatusService } from '../order-status/order-status.service';
import { ProductService } from '../product/product.service';
import { OrderDetailService } from '../order-detail/order-detail.service';
@UseGuards(ApiKeyAuthGuard)
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartDetailService: CartDetailService,
    private readonly authservice: AuthService,
    private readonly orderStatusService:OrderStatusService,
    private readonly productService:ProductService,
    private readonly orderDetailService:OrderDetailService
  ) {}

  private randomString(length) {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Order!';
  }

  @Get('/all')
  async getListOrders(): Promise<Array<any>> {
    return this.orderService.findAll();
  }

  @Post('/create-order')
  async createNewOrder(
    @Headers() headers,
    @Body() body,
    @Res() res,
  ): Promise<any> {

    const isTokenValid = await this.authservice.dechiperUserToken(headers.authorization.split('Bearer ')[1]);
    if(isTokenValid)
    {
      const customerCart = await this.cartDetailService.findCartDetailByUserCustomer(headers);
  
      if (customerCart.length !== 0) 
      {   
        const userDetail = await this.authservice.dechiperUserToken(headers.authorization.split('Bearer ')[1]);
        await this.cartDetailService.deleteCartByIdUserCustomer(userDetail.userDetail.id );
        console.log({ customerCart });
        //console.log({ userDetail });
        for(let elm of customerCart)
        {
          const productDetail = await this.productService.findById(elm.idProduct)
          if(productDetail.dataValues.available_quantity >= elm.quantity)
          {
            try
            {
              await this.productService.updateQuantityProduct(elm.id,productDetail.dataValues.available_quantity - elm.quantity)
            }
            catch(err)
            {
              res.status(500).json({ result: 'internal server error' }); 
            }
          }
          else
          {
            res.status(418).json({ result: 'not authorized' });
          }
        }

        const orderStatus = await this.orderStatusService.findStatusId("in lavorazione")
  
        let price = 0
        const date = Date.now()
  
        customerCart.map(async (data)=>{
          //console.log({data})
          let productData = await this.productService.findById(data.idProduct)
          price = price + (productData.dataValues.unit_price * data.quantity)
        })
  
        let newOrderEntity = {
          id_user_customer: userDetail.userDetail.id,
          id_user_worker: null,
          order_date: date,
          id_order_status: orderStatus.dataValues.id_order_status, 
          courier_name: '',
          tracking_code: this.randomString(15),
          start_shipping_date: null,
          expected_delivery_date: date + 1296000000,
          delivery_date: null,
          price: price,
        };
  
        const newCreatedOrder = await this.orderService.createOrder(newOrderEntity)
        console.log({newCreatedOrder})
  
        for(let elm of customerCart)
        {
          const productDetail = await this.productService.findById(elm.idProduct)
          console.log({elm})
          const orderDetailEntity = {
            id_order:newCreatedOrder.dataValues.id_order,
            id_product:elm.idProduct,
            price:productDetail.unit_price,
            quantity:elm.quantity,
            description:productDetail.dataValues.description
          }
          await this.orderDetailService.createOrderDetail(orderDetailEntity)
        }
        res.status(200).json({ result: 'order created' });
      } 
      else 
      {
        res.status(200).json({ result: 'non ci sono prodotti nel carello' });
      }
    }
    else
    {
      res.status(403).json({ result: 'not authorized' });
    }
  }
}

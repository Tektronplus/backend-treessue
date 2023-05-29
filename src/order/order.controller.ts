import {
  Controller,
  Get,
  Headers,
  Res,
  UseGuards,
  Post,
  Param,
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
    private readonly orderStatusService: OrderStatusService,
    private readonly productService: ProductService,
    private readonly orderDetailService: OrderDetailService,
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

  @Get('/customerOrderList')
  async getCustomerOrder(
    @Param() param,
    @Headers() headers,
    @Res() res,
  ): Promise<Array<any>> {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: 'bad request' });
      return;
    }
    if (headers.authorization.substring(0, 7) != 'Bearer ') {
      res.status(401).json({ result: 'not authorized' });
      return;
    }

    const isTokenValid = await this.authservice.validateToken(
      headers.authorization.split('Bearer ')[1],
    );
    if (isTokenValid) {
      const listOfOrder = [];
      try {
        const userDetail = await this.authservice.dechiperUserToken(
          headers.authorization.split('Bearer ')[1],
        );
        //console.log({userDetail})
        const orderList = await this.orderService.getCustomerOrder(
          userDetail.userDetail.id,
        );
        //console.log(orderList)

        for (const elm of orderList) {
          elm.id_order_status = await this.orderStatusService.findStatusById(
            elm.id_order_status,
          );
          console.log(elm.id_order_status.dataValues.status);
          const orderEntity = {
            id_order: elm.id_order,
            id_user_customer: elm.id_user_customer,
            id_user_worker: elm.id_user_worker,
            id_order_status: elm.id_order_status.dataValues.status,
            order_date: elm.order_date,
            courier_name: elm.courier_name,
            tracking_code: elm.tracking_code,
            start_shipping_date: elm.start_shipping_date,
            expected_delivery_date: elm.expected_delivery_date,
            delivery_date: elm.delivery_date,
            price: elm.price,
          };
          listOfOrder.push(orderEntity);
        }
        console.log({ listOfOrder });
        res.status(200).json({ result: listOfOrder });
        return;
      } catch (err) {
        res.status(500).json({ result: 'internal server error' });
        return;
      }
    } else {
      res.status(500).json({ result: 'internal server error' });
      return;
    }
  }
  @Get("/getOrderDetail/:id")
    async getOrderDetail(@Param() param, @Headers() headers, @Res() res)
    {

        if(headers.authorization == undefined)
        {
          res.status(404).json({ result: 'bad request' });
          return
        }
        if(headers.authorization.substring(0,7) != "Bearer ")
        {
          res.status(401).json({ result: 'not authorized' });
          return
        }
    
        let token = headers.authorization.split('Bearer ')[1];
        console.log({ token });
        const isTokenValid = await this.authservice.validateToken(token);
        if(isTokenValid)
        {
          const decodedInfo = await this.authservice.dechiperUserToken(token);
          console.log({ decodedInfo });
          try
          {
            let orderDetail = await this.orderDetailService.findOrderDetail(param.id)
            orderDetail = orderDetail.map((data)=>{      
              const orderDetail = {
                id_order_detail: data.dataValues.id_order_detail,
                id_order: data.dataValues.id_order,
                product: data.dataValues.id_product,
                price: data.dataValues.price,
                quantity: data.dataValues.quantity,
                description: data.dataValues.description
              }
              return orderDetail
            })
            for(let elm of orderDetail)
            {
              elm.product = await this.productService.findById(elm.product)
              elm.product = elm.product.dataValues.prod_name   
            }
            console.log({orderDetail})
            return orderDetail
          }
          catch(err)
          {
            res.status(500).json({ result: 'internal server error' });
            return
          }

        }
        else
        {
            res.status(403).json({ result: 'not authorized' });
            return
        }
    }

  @Post('/createOrder')
  async createNewOrder(@Headers() headers, @Res() res): Promise<any> {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: 'bad request' });
      return;
    }
    if (headers.authorization.substring(0, 7) != 'Bearer ') {
      res.status(401).json({ result: 'not authorized' });
      return;
    }

    const isTokenValid = await this.authservice.validateToken(
      headers.authorization.split('Bearer ')[1],
    );
    if (isTokenValid) {
      const customerCart =
        await this.cartDetailService.findCartDetailByUserCustomer(headers);

      if (customerCart.length !== 0) {
        const userDetail = await this.authservice.dechiperUserToken(
          headers.authorization.split('Bearer ')[1],
        );
        console.log({ customerCart });
        console.log({ userDetail });
        for (let elm of customerCart) 
        {
          const productDetail = await this.productService.findById(elm.idProduct);
          console.log({productDetail})
          if (productDetail.dataValues.available_quantity >= elm.quantity) {
            try 
            {
              await this.productService.updateQuantityProduct(elm.idProduct,productDetail.dataValues.available_quantity - elm.quantity);
            } 
            catch (err) 
            {
              res.status(500).json({ result: 'internal server error' });
              return;
            }
          } else {
            res.status(418).json({
              result:
                'quantity for:' +
                productDetail.dataValues.prod_name +
                ' too high, avaible quantity:' + productDetail.dataValues.available_quantity, 
            });
            return;
          }
        }

        const orderStatus = await this.orderStatusService.findStatusId(
          'in lavorazione',
        );

        let price = 0;
        const date = Date.now();

        for (const elm of customerCart) {
          const productData = await this.productService.findById(elm.idProduct);
          price = price + productData.dataValues.unit_price * elm.quantity;
          console.log({ price });
        }

        const newOrderEntity = {
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

        const newCreatedOrder = await this.orderService.createOrder(
          newOrderEntity,
        );
        console.log({ newCreatedOrder });

        for (const elm of customerCart) {
          const productDetail = await this.productService.findById(
            elm.idProduct,
          );
          console.log({ elm });
          const orderDetailEntity = {
            id_order: newCreatedOrder.dataValues.id_order,
            id_product: elm.idProduct,
            price: productDetail.unit_price,
            quantity: elm.quantity,
            description: productDetail.dataValues.description,
          };
          await this.orderDetailService.createOrderDetail(orderDetailEntity);
        }
        await this.cartDetailService.deleteCartByIdUserCustomer(
          userDetail.userDetail.id,
        );
        res.status(200).json({ result: 'order created' });
        return;
      } else {
        res.status(200).json({ result: 'non ci sono prodotti nel carello' });
        return;
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return;
    }
  }
}

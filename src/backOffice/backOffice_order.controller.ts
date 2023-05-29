import {
    Controller,
    Get,
    UseGuards,
    Post,
    Req,
    Headers,
    Res,
    Body,
    Param,
  } from '@nestjs/common';

import { OrderService } from '../order/order.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from '../auth/auth.service';
import { OrderStatusService } from 'src/order-status/order-status.service';
import { UserCustomerService } from 'src/user-customer/user-customer.service';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { ProductService } from '../product/product.service';
  


  @UseGuards(ApiKeyAuthGuard)
  @Controller('backOfficeOrder')
  export class BackOfficeOrderController {
    constructor(
      private orderService:OrderService,
      private userCustomerService:UserCustomerService,
      private orderStatusService:OrderStatusService,
      private orderDetailService:OrderDetailService,
      private productService:ProductService,
      private authService: AuthService
    ) {}

    @Get("/getAllOrder")
    async getOrderList(@Headers() headers, @Res() res)
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
        const isTokenValid = await this.authService.validateToken(token);
        if(isTokenValid)
        {
            const decodedInfo = await this.authService.dechiperUserToken(token);
            console.log({ decodedInfo });
            if (decodedInfo.userDetail.role == 'admin' || decodedInfo.userDetail.role == "ufficio")
            {
                try
                {
                    const orderList = await this.orderService.findAll() 
                    for(let elm of orderList)
                    {
                        elm.order_status = await this.orderStatusService.findStatusById(elm.order_status)
                        elm.order_status = elm.order_status.dataValues.status
                        elm.user_customer = await this.userCustomerService.findOneById(elm.user_customer)
                        elm.user_customer = elm.user_customer.dataValues.first_name + " " + elm.user_customer.dataValues.last_name
                        console.log({elm})
                    }
                    res.status(200).json({ result: orderList });
                    return
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
        else
        {
            res.status(403).json({ result: 'not authorized' });
            return
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
        const isTokenValid = await this.authService.validateToken(token);
        if(isTokenValid)
        {
            const decodedInfo = await this.authService.dechiperUserToken(token);
            console.log({ decodedInfo });
            if (decodedInfo.userDetail.role == 'admin' || decodedInfo.userDetail.role == "ufficio")
            {
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
        else
        {
            res.status(403).json({ result: 'not authorized' });
            return
        }
    }

    @Get()
    async getOrderById(@Param() param, @Headers() headers, @Res() res)
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
        const isTokenValid = await this.authService.validateToken(token);
        if(isTokenValid)
        {
            const decodedInfo = await this.authService.dechiperUserToken(token);
            console.log({ decodedInfo });
            if (decodedInfo.userDetail.role == 'admin' || decodedInfo.userDetail.role == "ufficio")
            {
                try
                {
                    const order = {
                        id_order: "",
                        user_customer: "",
                        user_worker: null,
                        order_status: "",
                        order_date: "",
                        courier_name: "",
                        tracking_code: "",
                        start_shipping_date: null,
                        expected_delivery_date: "",
                        delivery_date: null,
                        orderList:[],
                        price: ""
                    }

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
        else
        {
            res.status(403).json({ result: 'not authorized' });
            return
        }
    }
  

}
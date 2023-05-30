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
  Put,
} from "@nestjs/common";

import { OrderService } from "../order/order.service";
import { ApiKeyAuthGuard } from "../auth/guard/apikey-auth.guard";
import { AuthService } from "../auth/auth.service";
import { OrderStatusService } from "../order-status/order-status.service";
import { UserCustomerService } from "../user-customer/user-customer.service";
import { OrderDetailService } from "../order-detail/order-detail.service";
import { ProductService } from "../product/product.service";

@UseGuards(ApiKeyAuthGuard)
@Controller("backOfficeOrder")
export class BackOfficeOrderController {
  constructor(
    private orderService: OrderService,
    private userCustomerService: UserCustomerService,
    private orderStatusService: OrderStatusService,
    private orderDetailService: OrderDetailService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  @Get("/getAllOrder")
  async getOrderList(@Headers() headers, @Res() res) {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: "bad request" });
      return;
    }
    if (headers.authorization.substring(0, 7) != "Bearer ") {
      res.status(401).json({ result: "not authorized" });
      return;
    }

    const token = headers.authorization.split("Bearer ")[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo = await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      if (
        decodedInfo.userDetail.role == "admin" ||
        decodedInfo.userDetail.role == "ufficio"
      ) {
        try {
          const orderList = await this.orderService.findAll();
          for (let elm of orderList) {
            elm.order_status = await this.orderStatusService.findStatusById(
              elm.order_status
            );
            elm.order_status = elm.order_status.dataValues.status;
            elm.user_customer = await this.userCustomerService.findOneById(
              elm.user_customer
            );
            elm.user_customer =
              elm.user_customer.dataValues.first_name +
              " " +
              elm.user_customer.dataValues.last_name;
            console.log({ elm });
          }
          res.status(200).json({ result: orderList });
          return;
        } catch (err) {
          res.status(500).json({ result: "internal server error" });
          return;
        }
      } else {
        res.status(403).json({ result: "not authorized" });
        return;
      }
    } else {
      res.status(403).json({ result: "not authorized" });
      return;
    }
  }

  @Get("/getOrderDetail/:id")
  async getOrderDetail(@Param() param, @Headers() headers, @Res() res) {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: "bad request" });
      return;
    }
    if (headers.authorization.substring(0, 7) != "Bearer ") {
      res.status(401).json({ result: "not authorized" });
      return;
    }

    const token = headers.authorization.split("Bearer ")[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo = await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      if (
        decodedInfo.userDetail.role == "admin" ||
        decodedInfo.userDetail.role == "ufficio"
      ) {
        try {
          let orderDetail = await this.orderDetailService.findOrderDetail(
            param.id
          );
          orderDetail = orderDetail.map((data) => {
            const orderDetail = {
              id_order_detail: data.dataValues.id_order_detail,
              id_order: data.dataValues.id_order,
              product: data.dataValues.id_product,
              price: data.dataValues.price,
              quantity: data.dataValues.quantity,
              description: data.dataValues.description,
            };
            return orderDetail;
          });
          for (let elm of orderDetail) {
            elm.product = await this.productService.findById(elm.product);
            elm.product = elm.product.dataValues.prod_name;
          }
          console.log({ orderDetail });
          return orderDetail;
        } catch (err) {
          res.status(500).json({ result: "internal server error" });
          return;
        }
      } else {
        res.status(403).json({ result: "not authorized" });
        return;
      }
    } else {
      res.status(403).json({ result: "not authorized" });
      return;
    }
  }

  @Get("getOrderById/:id")
  async getOrderById(@Param() param, @Headers() headers, @Res() res) {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: "bad request" });
      return;
    }
    if (headers.authorization.substring(0, 7) != "Bearer ") {
      res.status(401).json({ result: "not authorized" });
      return;
    }

    let token = headers.authorization.split("Bearer ")[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo = await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      if (
        decodedInfo.userDetail.role == "admin" ||
        decodedInfo.userDetail.role == "ufficio"
      ) {
        try {
          const order = {
            id_order: null,
            user_customer: null,
            user_worker: null,
            order_status: null,
            order_date: null,
            courier_name: null,
            tracking_code: null,
            start_shipping_date: null,
            expected_delivery_date: null,
            delivery_date: null,
            orderList: [],
            price: null,
          };

          const orderData = await this.orderService.getOrderById(param.id);

          order.id_order = orderData[0].id_order;
          order.user_customer = await this.userCustomerService.findOneById(
            orderData[0].id_user_customer
          );
          order.user_customer =
            order.user_customer.dataValues.first_name +
            " " +
            order.user_customer.dataValues.last_name;
          order.user_worker = orderData[0].id_user_worker;
          order.order_status = await this.orderStatusService.findStatusById(
            orderData[0].id_order_status
          );
          order.order_status = order.order_status.dataValues.status;
          order.order_date = orderData[0].order_date;
          order.courier_name = orderData[0].courier_name;
          order.tracking_code = orderData[0].tracking_code;
          order.start_shipping_date = orderData[0].start_shipping_date;
          order.expected_delivery_date = orderData[0].expected_delivery_date;
          order.delivery_date = orderData[0].delivery_date;
          order.price = orderData[0].price;

          let orderDetail = await this.orderDetailService.findOrderDetail(
            order.id_order
          );

          orderDetail = orderDetail.map((data) => {
            //console.log({data})
            const orderDetail = {
              product: {
                id_order_detail: data.dataValues.id_order_detail,
                id_product: data.dataValues.id_product,
                unit_price: data.dataValues.price,
                description: data.dataValues.description,
              },
              quantity: data.dataValues.quantity,
            };
            return orderDetail;
          });
          //console.log({orderDetail})
          for (let elm of orderDetail) {
            // elm.product = await this.productService.findById(elm.product);
            //elm.product = elm.product.dataValues.prod_name;
            order.orderList.push(elm);
          }
          res.status(200).json({ result: order });
          return;
        } catch (err) {
          console.log({ err });
          res.status(500).json({ result: "internal server error" });
          return;
        }
      } else {
        res.status(403).json({ result: "not authorized" });
        return;
      }
    } else {
      res.status(403).json({ result: "not authorized" });
      return;
    }
  }

  @Put("/update/:idOrder")
  async updateOrderById(
    @Param() param,
    @Headers() headers,
    @Res() res,
    @Body() body
  ): Promise<any> {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: "bad request" });
      return;
    }
    if (headers.authorization.substring(0, 7) != "Bearer ") {
      res.status(401).json({ result: "not authorized" });
      return;
    }

    const token = headers.authorization.split("Bearer ")[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo = await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      if (
        decodedInfo.userDetail.role == "admin" ||
        decodedInfo.userDetail.role == "ufficio"
      ) {
        try {
          const result = await this.orderService.updateOrderById(
            param.idOrder,
            body
          );
          console.log(result);
          res.status(200).json({ result: "Query executed successfully" });
          return;
        } catch (err) {
          res.status(400).json({
            result:
              "Query error, please check your data. Probably, there is no difference between your data and the data that already exists.",
          });
          return;
        }
      } else {
        res.status(403).json({ result: "not authorized" });
        return;
      }
    } else {
      res.status(403).json({ result: "not authorized" });
      return;
    }
  }

  @Post("/createOrder")
  async createBackofficeOrder(
    @Headers() headers,
    @Body() body,
    @Res() res
  ): Promise<any> {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: "bad request" });
      return;
    }
    if (headers.authorization.substring(0, 7) != "Bearer ") {
      res.status(401).json({ result: "not authorized" });
      return;
    }

    const token = headers.authorization.split("Bearer ")[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo = await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      if (
        decodedInfo.userDetail.role == "admin" ||
        decodedInfo.userDetail.role == "ufficio"
      ) {
        const response = await this.orderService.createOrderBackoffice(body);
        res.status(200).json({ result: response });
        return;
      } else {
        res.status(403).json({ result: "not authorized" });
        return;
      }
    } else {
      res.status(403).json({ result: "not authorized" });
      return;
    }
  }
}

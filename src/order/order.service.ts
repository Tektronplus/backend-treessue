import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Order } from './order.entity';
import { OrderDetailService } from 'src/order-detail/order-detail.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private OrderRepository: typeof Order,
    private orderDetailService: OrderDetailService,
  ) {}

  async findAll(): Promise<any> {
    const orderList = await this.OrderRepository.findAll();
    //console.log({orderList})
    const orderData = await orderList.map((data) => {
      const orderData = {
        id_order: data.dataValues.id_order,
        user_customer: data.dataValues.id_user_customer,
        user_worker: data.dataValues.id_user_worker,
        order_status: data.dataValues.id_order_status,
        order_date: data.dataValues.order_date,
        courier_name: data.dataValues.courier_name,
        tracking_code: data.dataValues.tracking_code,
        start_shipping_date: data.dataValues.start_shipping_date,
        expected_delivery_date: data.dataValues.expected_delivery_date,
        delivery_date: data.dataValues.delivery_date,
        price: data.dataValues.price,
      };
      return orderData;
    });
    //console.log({orderData})
    return orderData;
  }

  async createOrder(order) {
    try {
      return await this.OrderRepository.create(order);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCustomerOrder(id) {
    try {
      const customerOrder = await this.OrderRepository.findAll({
        where: { id_user_customer: id },
      });
      const orderList = await customerOrder.map((data) => {
        return data.dataValues;
      });
      return orderList;
    } catch (err) {
      throw new Error(err);
    }
  }

  customException = new CustomException();
  async updateOrderById(id_order, body): Promise<any> {
    console.log(id_order);
    console.log(body);
    await this.customException.checkFindById(id_order, this.OrderRepository);

    return this.OrderRepository.update(
      {
        id_user_worker: body.id_user_worker,
        id_order_status: body.id_order_status,
        courier_name: body.courier_name,
      },
      { where: { id_order: id_order } },
    ).then((res) => {
      if (res[0] == 1) {
        return { result: 'Query executed successfully' };
      } else {
        throw new BadRequestException('Something bad happened', {
          cause: new Error(),
          description:
            'Query error, please check your data. Probably, there is no difference between your data and the data that already exists.',
        });
      }
    });
  }
  async getOrderById(id) {
    try {
      const customerOrder = await this.OrderRepository.findAll({
        where: { id_order: id },
      });
      const orderList = await customerOrder.map((data) => {
        return data.dataValues;
      });
      return orderList;
    } catch (err) {
      throw new Error(err);
    }
  }

  customMethods = new CustomMethods();
  async createOrderBackoffice(body): Promise<any> {
    //check quantity product
    this.customException.checkQuantity(body.cart);

    const totalPrice =
      Math.round(this.customMethods.calcTotalCart(body.cart) * 100) / 100;

    const newOrder = {
      id_user_customer: body.id_user_customer,
      id_user_worker: null,
      order_date: Date.now(),
      id_order_status: 1,
      courier_name: body.courier_name,
      tracking_code: this.customMethods.randomString(15),
      start_shipping_date: null,
      expected_delivery_date: Date.now() + 1296000000,
      delivery_date: null,
      price: totalPrice,
    };

    const createdOrder = await this.OrderRepository.create(newOrder);

    for (const cartItem of body.cart) {
      const newOrderDetail = {
        id_order: createdOrder.id_order,
        id_product: cartItem.product.id_product,
        price: cartItem.product.unit_price,
        quantity: cartItem.quantity,
        description: cartItem.product.description,
      };

      await this.orderDetailService.createOrderDetail(newOrderDetail);
    }

    return createdOrder;
  }
}

class CustomException {
  async checkFindById(id_order, orderRepository) {
    const arrayIdProducts = await orderRepository
      .findAll({ attributes: ['id_order'] })
      .then((res) => res.flatMap((prod) => prod['id_order']));

    if (!arrayIdProducts.includes(Number(id_order))) {
      throw new NotFoundException('Something bad happened', {
        cause: new Error(),
        description: "This id_product doesn't exist in the DB.",
      });
    }
  }

  checkQuantity(cart) {
    for (const cartItem of cart) {
      if (cartItem.product.available_quantity < cartItem.quantity) {
        throw new NotFoundException('Not found exception', {
          cause: new Error(),
          description: `There is not enough quantity for the product with id:${cartItem.product.id_product}`,
        });
      }
    }
    return true;
  }
}

class CustomMethods {
  randomString(length) {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  calcTotalCart(cart) {
    console.log({ cart });
    return cart.reduce(
      (acc, cur) => acc + cur.product.unit_price * cur.quantity,
      0,
    );
  }
}

import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private OrderRepository: typeof Order,
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
}

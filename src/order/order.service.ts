import { Injectable, Inject } from '@nestjs/common';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private OrderRepository: typeof Order,
  ) {}


  async findAll(): Promise<Order[]> {
    return this.OrderRepository.findAll();
  }

  async createOrder(order)
  {
    try{
      return await this.OrderRepository.create(order)
    }
    catch(err)
    {
      throw new Error(err)
    }
  }
}



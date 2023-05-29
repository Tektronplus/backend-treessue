import { Injectable, Inject } from '@nestjs/common';
import { OrderDetail } from './order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @Inject('ORDER_DETAIL_REPOSITORY')
    private orderDetailRepository: typeof OrderDetail,
  ) {}

  async findAll(): Promise<OrderDetail[]> {
    return this.orderDetailRepository.findAll();
  }

  async createOrderDetail(orderDetail)
  {
    try{
      return await this.orderDetailRepository.create(orderDetail)
    }
    catch(err)
    {
      throw new Error(err)
    }
  }

  async findOrderDetail(id): Promise<any>
  {
    try
    {
      return await this.orderDetailRepository.findAll({where:{id_order:id}})
    }
    catch(err)
    {
      throw new Error(err)
    }
  }
}

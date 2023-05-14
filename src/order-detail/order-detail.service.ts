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
}

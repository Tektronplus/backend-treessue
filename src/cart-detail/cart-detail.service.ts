import { Injectable, Inject } from '@nestjs/common';
import { CartDetail } from './cart-detail.entity';

@Injectable()
export class CartDetailService {
  constructor(
    @Inject('CART_DETAIL_REPOSITORY')
    private cartDetailRepository: typeof CartDetail,
  ) {}

  async findAll(): Promise<CartDetail[]> {
    return this.cartDetailRepository.findAll();
  }
}

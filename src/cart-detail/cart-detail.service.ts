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

  async addItemToCart(idUserCustomer, idProduct, quantity) {
    const newCartItem = {
      id_user_customer: idUserCustomer,
      id_product: idProduct,
      quantity: quantity,
    };

    return this.cartDetailRepository.create(newCartItem);
  }
}

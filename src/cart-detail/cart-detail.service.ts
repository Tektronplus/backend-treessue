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

  async findCartDetailByUserCustomer(idUserCustomer): Promise<Array<any>> {
    return this.cartDetailRepository
      .findAll({
        where: { id_user_customer: idUserCustomer },
      })
      .then((res) =>
        res.map((cartItem) => {
          delete cartItem.id_user_customer;
          return cartItem;
        }),
      );
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

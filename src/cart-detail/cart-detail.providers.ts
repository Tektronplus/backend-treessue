import { CartDetail } from './cart-detail.entity';

export const cartDetailProvider = [
  {
    provide: 'CART_DETAIL_REPOSITORY',
    useValue: CartDetail,
  },
];

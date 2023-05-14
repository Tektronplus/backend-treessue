import { Discount } from './discount.entity';

export const discountProvider = [
  {
    provide: 'DISCOUNT_REPOSITORY',
    useValue: Discount,
  },
];

import { OrderDetail } from './order-detail.entity';

export const orderDetailProvider = [
  {
    provide: 'ORDER_DETAIL_REPOSITORY',
    useValue: OrderDetail,
  },
];

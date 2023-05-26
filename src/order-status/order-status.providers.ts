import { OrderStatus } from './order-status.entity';

export const orderStatusProvider = [
  {
    provide: 'ORDER_STATUS_REPOSITORY',
    useValue: OrderStatus,
  },
];

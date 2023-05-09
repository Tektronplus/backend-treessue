import { userCustomer } from './userCustomer.entity';

export const userCustomerProvider = [
  {
    provide: 'USER_CUSTOMER REPOSITORY',
    useValue: userCustomer,
  },
];

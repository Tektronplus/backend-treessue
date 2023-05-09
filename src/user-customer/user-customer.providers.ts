import { UserCustomer } from './user-customer.entity';

export const userCustomerProvider = [
  {
    provide: 'USER_CUSTOMER_REPOSITORY',
    useValue: UserCustomer,
  },
];

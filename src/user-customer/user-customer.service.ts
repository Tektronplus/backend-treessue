import { Injectable, Inject } from '@nestjs/common';
import { UserCustomer } from './user-customer.entity';

@Injectable()
export class UserCustomerService {
  constructor(
    @Inject('USER_CUSTOMER_REPOSITORY')
    private userCustomerRepository: typeof UserCustomer,
  ) {}

  async findAll(): Promise<UserCustomer[]> {
    return this.userCustomerRepository.findAll();
  }
}

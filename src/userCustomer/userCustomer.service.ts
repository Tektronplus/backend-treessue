import { Injectable, Inject } from '@nestjs/common';
import { userCustomer } from './userCustomer.entity';

@Injectable()
export class userCustomerService {
  constructor(
    @Inject('USER_CUSTOMER REPOSITORY')
    private userCustomer_repository: typeof userCustomer,
  ) {}

  async findAll(): Promise<userCustomer[]> {
    return this.userCustomer_repository.findAll<userCustomer>();
  }
}

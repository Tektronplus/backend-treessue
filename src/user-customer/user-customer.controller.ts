import { Controller, Get } from '@nestjs/common';
import { UserCustomerService } from './user-customer.service';

@Controller('user-customer')
export class UserCustomerController {
  constructor(private readonly userCustomerService: UserCustomerService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Customer!';
  }

  @Get('/all')
  async getListUsersCustomers(): Promise<Array<any>> {
    return this.userCustomerService.findAll();
  }
}

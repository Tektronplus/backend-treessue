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

  async createUser(user): Promise<string>{
    console.log({user})
    try{
      let newUserCustomer = await this.userCustomerRepository.create({
        first_name:user.first_name,
        last_name:user.last_name,
        birth_date:user.birth_date,
        phone_number:user.phone_number,
        email:user.email,
        country:user.country,
        province:user.province,
        city:user.city,
        zip_code:user.zip_code,
        address:user.address,
      })
      console.log({newUserCustomer})
      return "ciao"
    }
    catch(err)
    {
      throw new Error(err)
    }
  }
}

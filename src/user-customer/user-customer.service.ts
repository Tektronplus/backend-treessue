import { Injectable, Inject } from '@nestjs/common';
import { UserCustomer } from './user-customer.entity';
import { where } from 'sequelize';

@Injectable()
export class UserCustomerService {
  constructor(
    @Inject('USER_CUSTOMER_REPOSITORY')
    private userCustomerRepository: typeof UserCustomer,
  ) {}

  async findAll(): Promise<UserCustomer[]> {
    return this.userCustomerRepository.findAll();
  }

  async createUser(user): Promise<any> {
    console.log({ user });
    try {
      const newUserCustomer = await this.userCustomerRepository.create({
        first_name: user.first_name,
        last_name: user.last_name,
        birth_date: user.birth_date,
        phone_number: user.phone_number,
        country: user.country,
        province: user.province,
        city: user.city,
        zip_code: user.zip_code,
        address: user.address,
<<<<<<< HEAD
        is_active:true
=======
        is_active: user.is_active,
>>>>>>> 20bb83f188306f75c491bab431876d4988ae38aa
      });
      console.log({ newUserCustomer });
      return newUserCustomer;
    } catch (err) {
      throw new Error(err);
    }
  }

  async DeleteUser(user): Promise<any> {
    console.log({ user });
    try {
      let foundUser = await this.userCustomerRepository.update({is_active:0},{where:{id_user_customer:user.id,is_active:1}})
      console.log({ foundUser });
      return foundUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}

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

  async verifyUserData(user): Promise<any> {
    console.log({ user });
    try {
      const foundUser = await this.userCustomerRepository.findOne({where:{
          first_name: user.first_name,
          last_name: user.last_name,
          birth_date: user.birth_date,
        }
      });
      console.log({ foundUser });
      return foundUser;
    } catch (err) {
      throw new Error(err);
    }
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
        is_active:1
      });
      console.log({ newUserCustomer });
      return newUserCustomer;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateInfoLogin(existingValue,user)
  {
    try
    {
      let updateUser = await this.userCustomerRepository.update(
        {
          first_name: existingValue.first_name != user.first_name ? user.first_name : existingValue.first_name,
          last_name: existingValue.last_name != user.last_name ? user.last_name : existingValue.last_name,
          birth_date: existingValue.birth_date != user.birth_date ? user.birth_date : existingValue.birth_date,
          phone_number: existingValue.phone_number != user.phone_number ? user.phone_number : existingValue.phone_number,
          country: existingValue.country != user.country ? user.country : existingValue.country,
          province: existingValue.province != user.province ? user.province : existingValue.province,
          city: existingValue.city != user.city ? user.city : existingValue.city,
          zip_code: existingValue.zip_code != user.zip_code ? user.zip_code : existingValue.zip_code,
          address: existingValue.address != user.address ? user.address : existingValue.address,
        },{where:{id_user_customer:existingValue.id_user_customer}
      })
      return existingValue.id_user_customer
    }
    catch (err) {
      throw new Error(err);
    }
  }

  async updateDetail(existingValue,user)
  {
    try
    {
      let updateUser = await this.userCustomerRepository.update(
        {
          first_name: existingValue.first_name != user.first_name ? user.first_name : existingValue.first_name,
          last_name: existingValue.last_name != user.last_name ? user.last_name : existingValue.last_name,
          birth_date: existingValue.birth_date != user.birth_date ? user.birth_date : existingValue.birth_date,
          phone_number: existingValue.phone_number != user.phone_number ? user.phone_number : existingValue.phone_number,
          country: existingValue.country != user.country ? user.country : existingValue.country,
          province: existingValue.province != user.province ? user.province : existingValue.province,
          city: existingValue.city != user.city ? user.city : existingValue.city,
          zip_code: existingValue.zip_code != user.zip_code ? user.zip_code : existingValue.zip_code,
          address: existingValue.address != user.address ? user.address : existingValue.address,
        },{where:{id_user_customer:existingValue.id}
      })

      return updateUser
    }
    catch (err) {
      throw new Error(err);
    }
  }
}

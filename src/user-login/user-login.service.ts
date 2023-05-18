import { Injectable, Inject } from '@nestjs/common';
import { UserLogin } from './user-login.entity';
import * as bcrypt from 'bcrypt';
import { UserCustomer } from '../user-customer/user-customer.entity';
@Injectable()
export class UserLoginService {
  constructor(
    @Inject('USER_LOGIN_REPOSITORY')
    private userLoginRepository: typeof UserLogin,
  ) {}

  async findAll(): Promise<UserLogin[]> {
    return this.userLoginRepository.findAll();
  }

  async findAllCustomer(): Promise<UserLogin[]> {
    return this.userLoginRepository.findAll({
      include:[
       {
        model:UserCustomer,
        required:true
       }
      ]
    });
  }

  async findUserLogin(email,password): Promise<object>{
    console.log({email},{password})
    let userList = await this.userLoginRepository.findAll()
    let user = await userList.find((user)=>{if(bcrypt.compareSync(password,user.dataValues.password)&&user.dataValues.email==email){
      return user
    }})
    console.log({user})
    if(user != null)
    {
      return user.dataValues
    }
    else
    {
      throw new Error("no user found")
    }
  }

  async createUser(user): Promise<any> {
    console.log({ user });
    try {
      const newUserCustomer = await this.userLoginRepository.create({
        id_user_customer: user.userCustomer,
        email: user.email,
        password: user.password,
        role:user.role
      });
      //console.log({ newUserCustomer });
      return newUserCustomer;
    } catch (err) {
      console.log({err})
      throw new Error(err);
    }
  }

  async deleteUser(email): Promise<any> {
    console.log({ email });
    try {
      const destroyUser= await this.userLoginRepository.destroy({where:{email:email}});
      //console.log({ newUserCustomer });
      return destroyUser;
    } catch (err) { 
      throw new Error(err);
    }
  }
}

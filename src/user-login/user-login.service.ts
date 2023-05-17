import { Injectable, Inject } from '@nestjs/common';
import { UserLogin } from './user-login.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserLoginService {
  constructor(
    @Inject('USER_LOGIN_REPOSITORY')
    private userLoginRepository: typeof UserLogin,
  ) {}

  async findAll(): Promise<UserLogin[]> {
    return this.userLoginRepository.findAll();
  }

  async findUser(username,password): Promise<object>{
    console.log({username},{password})
    let userList = await this.userLoginRepository.findAll()
    let user = await userList.find((user)=>{if(bcrypt.compare(password,user.dataValues.password)&&user.dataValues.username==username){
      return user
    }})
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
        username: user.username,
        password: user.password,
        role:user.role
      });
      //console.log({ newUserCustomer });
      return newUserCustomer;
    } catch (err) {
      throw new Error(err);
    }
  }
}

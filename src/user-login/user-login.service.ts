import { Injectable, Inject } from '@nestjs/common';
import { UserLogin } from './user-login.entity';
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
    let user = await this.userLoginRepository.findOne({where: {username:username,password:password}})
    if(user != null)
    {
      return user.dataValues
    }
    else
    {
      throw new Error("no user found")
    }
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { UserLogin } from './user-login.entity';
import { where } from 'sequelize';
import { Where } from 'sequelize/types/utils';

let usersList = [
  {
    "id":"djifnsiud438ujui",
    "username":"jak",
    "password":"alabama",
    "role":"user"
  },
  {
    "id":"djisiud438ujui",
    "username":"roman",
    "password":"alabama",
    "role":"worker"
  }
]

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

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
}

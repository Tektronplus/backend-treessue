import { Injectable, Inject } from '@nestjs/common';
import { UserWorkerLogin } from './user-worker-login.entity';

@Injectable()
export class UserWorkerLoginService {
  constructor(
    @Inject('USER_WORKER_LOGIN_REPOSITORY')
    private userWorkerLoginRepository: typeof UserWorkerLogin,
  ) {}

  async findAll(): Promise<UserWorkerLogin[]> {
    return this.userWorkerLoginRepository.findAll();
  }
}

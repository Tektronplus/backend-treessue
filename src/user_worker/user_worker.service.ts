import { Injectable, Inject } from '@nestjs/common';
import { UserWorker } from './user_worker.entity';

@Injectable()
export class UserWorkerService {
  constructor(
    @Inject('USER_WORKER_REPOSITORY')
    private userLoginRepository: typeof UserWorker,
  ) {}

  async findAll(): Promise<UserWorker[]> {
    return this.userLoginRepository.findAll();
  }
}

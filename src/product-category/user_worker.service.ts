import { Injectable, Inject } from '@nestjs/common';
import { UserWorker } from './user_worker.entity';

@Injectable()
export class UserWorkerService {
  constructor(
    @Inject('USER_WORKER_REPOSITORY')
    private userWorkerRepository: typeof UserWorker,
  ) {}

  async findAll(): Promise<UserWorker[]> {
    return this.userWorkerRepository.findAll();
  }
}

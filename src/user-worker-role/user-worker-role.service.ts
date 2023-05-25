import { Injectable, Inject } from '@nestjs/common';
import { UserWorkerRole } from './user-worker-role.entity';

@Injectable()
export class UserWorkerRoleService {
  constructor(
    @Inject('USER_WORKER_ROLE_REPOSITORY')
    private userWorkerRoleRepository: typeof UserWorkerRole,
  ) {}

  async findAll(): Promise<UserWorkerRole[]> {
    return this.userWorkerRoleRepository.findAll();
  }
}

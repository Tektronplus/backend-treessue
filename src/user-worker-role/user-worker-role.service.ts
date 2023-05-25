import { Injectable, Inject } from '@nestjs/common';
import { UserWorkerRole } from './user-worker-role.entity';
import { where } from 'sequelize';

@Injectable()
export class UserWorkerRoleService {
  constructor(
    @Inject('USER_WORKER_ROLE_REPOSITORY')
    private userWorkerRoleRepository: typeof UserWorkerRole,
  ) {}

  async findAll(): Promise<UserWorkerRole[]> {
    return this.userWorkerRoleRepository.findAll();
  }

  async findRoleId(role): Promise<any> {
    return await this.userWorkerRoleRepository.findOne({where: { role: role }});
  }
  
  async findRoleById(id): Promise<any>
  {
    return await this.userWorkerRoleRepository.findOne({where:{id_user_worker_role:id}})
  }
}

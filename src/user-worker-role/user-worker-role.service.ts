import { Injectable, Inject } from '@nestjs/common';
import { UserWorkerRole } from './user-worker-role.entity';

@Injectable()
export class UserWorkerRoleService {
  constructor(
    @Inject('USER_WORKER_ROLE_REPOSITORY')
    private userWorkerRoleRepository: typeof UserWorkerRole,
  ) {}

  async findAll(): Promise<UserWorkerRole[]> {
    return await this.userWorkerRoleRepository.findAll();
  }

  async getListRole(): Promise<any>
  {
    try{
      let roleList = await this.userWorkerRoleRepository.findAll();
      let roleArray = await roleList.map((data)=>{
        return data.role
      })
      return roleArray
    }
    catch(err)
    {
      throw new Error(err);
    }
  }

  async findRoleId(role): Promise<any> {
    console.log({role})
    try
    {
      let foundRole = await this.userWorkerRoleRepository.findOne({where: { role: role }});
      console.log({foundRole})
      if(foundRole == null)
      {
        return undefined
      }
      else
      {
        return foundRole
      }
    }
    catch(err)
    {
      throw new Error(err);
    }
    
  }
  
  async findRoleById(id): Promise<any>
  {
    try{
      return await this.userWorkerRoleRepository.findOne({where:{id_user_worker_role:id}})
    }
    catch(err)
    {
      throw new Error(err);
    }
  }

  async createRole(role): Promise<any>
  {
    console.log({role})
    try
    {
      await this.userWorkerRoleRepository.create({role:role})
    }
    catch(err)
    {
      console.log({err})
      throw new Error(err);
    }
  }
}

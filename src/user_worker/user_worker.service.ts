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

  async createUserWorker(user): Promise<any>
  {
    console.log({user})
    let newWorker = await this.userWorkerRepository.create(user)
    return newWorker
  }

  async verifyUserWorker(user): Promise<any> {
    console.log({ user });
    try {
      const foundUser = await this.userWorkerRepository.findOne({where:{first_name: user.first_name,last_name:user.last_name}});
      console.log({ foundUser });
      return foundUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUserDetail(user): Promise<any> {
    console.log("USER CUSTOMER SERVICE: ",{user})
    const usersDetail = await this.userWorkerRepository.findOne({where:{id_user_Worker:user.id_user_customer},

    });
    console.log({usersDetail})
    let userDetailData = {
      id:usersDetail.dataValues.id_user_customer,
      email:user.email,
      firstName:usersDetail.dataValues.first_name,
      lastName: usersDetail.dataValues.last_name,
      role:user.role,
      type:usersDetail.dataValues.role
    }
    console.log({userDetailData})
    return userDetailData
  }


}

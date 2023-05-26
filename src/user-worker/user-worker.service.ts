import { Injectable, Inject } from '@nestjs/common';
import { UserWorker } from './user-worker.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserWorkerService {
  constructor(
    @Inject('USER_WORKER_REPOSITORY')
    private userWorkerRepository: typeof UserWorker,
  ) {}

  async findAll(): Promise<UserWorker[]> {
    return this.userWorkerRepository.findAll();
  }

  async createUserWorker(user): Promise<any> {
    console.log({ user });
    const newWorker = await this.userWorkerRepository.create(user);
    return newWorker;
  }

  async verifyUserWorker(user): Promise<any> {
    console.log({ user });
    try {
      const foundUser = await this.userWorkerRepository.findOne({
        where: { first_name: user.first_name, last_name: user.last_name },
      });
      console.log({ foundUser });
      return foundUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUserDetail(user): Promise<any> {
    console.log({ user });
    const usersDetail = await this.userWorkerRepository.findOne({
      where: { id_user_worker: user.id_user_worker },
    });
    console.log({ usersDetail });
    const userDetailData = {
      id: usersDetail.dataValues.id_user_worker,
      first_name: usersDetail.dataValues.first_name,
      last_name: usersDetail.dataValues.last_name,
      id_role: usersDetail.dataValues.id_user_worker_role,
    };
    console.log({ userDetailData });
    return userDetailData;
  }

  async findUserWorkerLogin(email, password): Promise<object> {
    console.log({ email }, { password });
    const userList = await this.userWorkerRepository.findAll();
    console.log(userList);
    const user = await userList.find((user) => {
      if (
        bcrypt.compareSync(password, user.dataValues.password) &&
        user.dataValues.email == email &&
        user.dataValues.is_active == 1
      ) {
        return user;
      }
    });
    if (user != null) {
      return user.dataValues;
    } else {
      throw new Error('no user found');
    }
  }

  async updateUserRole(userWorker,newRole)
  {
    try
    {
      await this.userWorkerRepository.update({id_user_worker_role:newRole},{where:{id_user_worker:userWorker.id}})
      return
    }
    catch(err)
    {
      throw new Error();
    }
  }
}

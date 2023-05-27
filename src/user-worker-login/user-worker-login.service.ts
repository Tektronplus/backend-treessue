import { Injectable, Inject } from '@nestjs/common';
import { UserWorkerLogin } from './user-worker-login.entity';
import { UserWorker } from '../user-worker/user-worker.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserWorkerLoginService {
  constructor(
    @Inject('USER_WORKER_LOGIN_REPOSITORY')
    private userWorkerLoginRepository: typeof UserWorkerLogin,
  ) {}

  async findAll(): Promise<UserWorkerLogin[]> {
    return this.userWorkerLoginRepository.findAll();
  }

  //VERIFICA ESISTENZA UTENTE LOGIN
  async verifyUserWorker(user): Promise<any> {
    console.log({ user });
    try {
      const foundUser = await this.userWorkerLoginRepository.findOne({
        where: { email: user.email },
      });
      console.log({ foundUser });
      return foundUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createUserWorker(user): Promise<any> {
    console.log({ user });
    try {
      const newUserLogin = await this.userWorkerLoginRepository.create({
        id_user_worker: user.id_user_worker,
        email: user.email,
        password: user.password,
        role: user.role,
        is_active: user.is_active,
      });
      //console.log({ newUserCustomer });
      return newUserLogin;
    } catch (err) {
      console.log(err.parent.code);
      throw new Error(err.parent.code);
    }
  }

  //USATA DA BACK OFFICE
  async findUserById(id): Promise<any> {
    console.log({ id });
    try {
      const foundUser = await this.userWorkerLoginRepository.findOne({
        where: { id_user_login_worker: id },
      });
      console.log({ foundUser });
      return foundUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  //BACKOFFICE PER TUTTI I CLIENTI
  async findAllWoker(): Promise<any> {
    const usersList = await this.userWorkerLoginRepository.findAll({
      include: [
        {
          model: UserWorker,
          required: true,
        },
      ],
    });
    //console.log({ usersList });
    const userInformation = await usersList.map((data) => {
      //console.log({ data });
      const userDetail = {
        email: data.email,
        id: data.id_user_login_worker,
        first_name: data.user_worker.first_name,
        last_name: data.user_worker.last_name,
        role: data.user_worker.id_user_worker_role,
        is_active: data.is_active,
      };
      return userDetail;
    });
    //console.log({ userInformation });
    return userInformation;
  }
  //FUNZIONE USATA PER IL LOGIN
  async findUserWorkerLogin(email, password): Promise<object> {
    console.log({ email }, { password });
    const userList = await this.userWorkerLoginRepository.findAll();
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
  //FUNZIONE USATA PER LA REGISTRAZIONE

  async updateUser(user, newPassword): Promise<any> {
    console.log({ user });
    try {
      const foundUser = await this.userWorkerLoginRepository.update(
        { password: newPassword },
        { where: { email: user.email } },
      );
      console.log({ foundUser });
      return foundUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  //FUNZIONE USATA PER LA DELETE DELL'UTENTE
  async deleteWorker(id): Promise<any> {
    try {
      const foundUser = await this.userWorkerLoginRepository.update(
        { is_active: 0 },
        { where: { id_user_login_worker: id } },
      );
      console.log({ foundUser });
      return foundUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  //FUNZIONE USATA PER LA RIATTIVAZIONE DELL'UTENTE
  async updateUserStatus(email): Promise<any> {
    console.log({ email });
    try {
      const foundUser = await this.userWorkerLoginRepository.update(
        { is_active: 1 },
        { where: { email: email } },
      );
      console.log({ foundUser });
      return foundUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}

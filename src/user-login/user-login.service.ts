import { Injectable, Inject } from '@nestjs/common';
import { UserLogin } from './user-login.entity';
import * as bcrypt from 'bcrypt';
import { UserCustomer } from '../user-customer/user-customer.entity';
@Injectable()
export class UserLoginService {
  constructor(
    @Inject('USER_LOGIN_REPOSITORY')
    private userLoginRepository: typeof UserLogin,
  ) {}

  async findAll(): Promise<UserLogin[]> {
    return this.userLoginRepository.findAll();
  }
  //VERIFICA ESISTENZA UTENTE
  async verifyUserLogin(user): Promise<any> {
    console.log({ user });
    try {
      const foundUser = await this.userLoginRepository.findOne({
        where: { email: user.email },
      });
      console.log({ foundUser });
      return foundUser;
    } catch (err) {
      throw new Error(err);
    }
  }

  //BACKOFFICE PER TUTTI I CLIENTI
  async findAllCustomer(): Promise<any> {
    const usersList = await this.userLoginRepository.findAll({
      where: { role: 'user' },
      include: [
        {
          model: UserCustomer,
          required: true,
        },
      ],
    });
    console.log({ usersList });
    const userInformation = await usersList.map((data) => {
      //console.log({data})
      const userDetail = {
        email: data.email,
        id_user_customer: data.user_customer.id_user_customer,
        phone_number: data.user_customer.phone_number,
        first_name: data.user_customer.first_name,
        last_name: data.user_customer.last_name,
        is_active: data.is_active,
      };
      return userDetail;
    });
    console.log({ userInformation });
    return userInformation;
  }
  //FUNZIONE USATA PER IL LOGIN
  async findUserLogin(email, password): Promise<object> {
    console.log({ email }, { password });
    const userList = await this.userLoginRepository.findAll();
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
    console.log('IN SERVICE: ', { user });
    console.log('============================================');
    console.log(user.dataValues);
    console.log('=================================================');
    if (user != null) {
      return user.dataValues;
    } else {
      throw new Error('no user found');
    }
  }
  //FUNZIONE USATA PER LA REGISTRAZIONE
  async createUser(user): Promise<any> {
    console.log({ user });
    try {
      const newUserLogin = await this.userLoginRepository.create({
        id_user_customer: user.userCustomer,
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

  async updateUser(user, newPassword): Promise<any> {
    console.log({ user });
    try {
      const foundUser = await this.userLoginRepository.update(
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
  async deleteUser(user): Promise<any> {
    console.log({ user });
    try {
      const foundUser = await this.userLoginRepository.update(
        { is_active: 0 },
        { where: { email: user.email } },
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
      const foundUser = await this.userLoginRepository.update(
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

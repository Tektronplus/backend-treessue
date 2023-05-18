import { Controller, Get, UseGuards, Post, Req, Headers } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserCustomerService } from '../user-customer/user-customer.service';
import { UserWorkerService } from '../user_worker/user_worker.service';
import * as bcrypt from 'bcrypt';
import moment from 'moment';
import { Base64 } from 'js-base64';

@UseGuards(ApiKeyAuthGuard)
@Controller('user-login')
export class UserLoginController {
  constructor(
    private readonly userLoginService: UserLoginService,
    private authService: AuthService,
  ) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Login!';
  }

  @Get('/all')
  async getListUsers(): Promise<Array<any>> {
    return this.userLoginService.findAll();
  }

  @Get('/allCustomer')
  async getListAllCustomer(): Promise<Array<any>> { 
    return this.userLoginService.findAllCustomer();
  }

  @Post('/login')
  async login(@Req() req, @Headers() headers) {
    type User = {
      username?: string;
      role?: string;
    };
    console.log({req}) 
    const headersData = headers.authorization.split("Basic ")[1]; 
    console.log({headersData})
    const data = Base64.decode(headersData);
    console.log({ data });
    try {
      const user: User = await this.userLoginService.findUser(
        data.split(':')[0],
        data.split(':')[1],
      );
      console.log({ user });
      return this.authService.generateUserToken(user);
    } catch (err) {
      console.log({ err });
      return { error: err.message };
    }
  }

  @Post('/delete')
  async deleteUser(@Req() req) {
    type User = {
      username?: string;
      role?: string;
    };

    try {
      const user: User = await this.userLoginService.findUser(
        req.body.username,
        req.body.password,
      );
      console.log({ user });
      return this.authService.generateUserToken(user);
    } catch (err) {
      console.log({ err });
      return { error: err.message };
    }
  }
}

@UseGuards(ApiKeyAuthGuard)
@Controller('user-registration')
export class UserRegisterController {
  constructor(
    private readonly userCustomerService: UserCustomerService,
    private userWorker: UserWorkerService,
    private userLoginService: UserLoginService,
  ) {}

  @Post('/registerCustomer')
  async registerUser(@Req() req) {
    const newUser = req.body;
    console.log({ newUser });
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(newUser.password, salt);
    const userLoginEntity = {
      userCustomer: '',
      email: newUser.email,
      password: hash,
      role: 'user',
    };
    const userCustomerEntity = {
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      birth_date: moment(newUser.birthDate, 'DD-MM-YYYY').toDate(),
      phone_number: newUser.phoneNumber,
      country: newUser.country,
      province: newUser.province,
      city: newUser.city,
      zip_code: newUser.zipCode,
      address: newUser.address,
    };

    try {
      const newCreatedUserCustomer = await this.userCustomerService.createUser(
        userCustomerEntity,
      );
      console.log({ newCreatedUserCustomer });
      userLoginEntity.userCustomer = newCreatedUserCustomer.id_user_customer;
      console.log({ userLoginEntity });
      const newCreatedUserLogin = await this.userLoginService.createUser(
        userLoginEntity,
      );
      console.log({ newCreatedUserLogin });
      return {status:201,messagge:"user created successufuly"};
    } catch (err) {
      console.log(err);
      return { status:400,messagge:"email" };
    }
    //console.log({userLoginEntity},{userCustomerEntity})
  }
}

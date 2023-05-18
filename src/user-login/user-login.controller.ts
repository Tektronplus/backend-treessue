import { Controller, Get, UseGuards, Post, Req, Headers, Res } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserCustomerService } from '../user-customer/user-customer.service';
import { UserWorkerService } from '../user_worker/user_worker.service';
import * as bcrypt from 'bcrypt';
//import * as moment from 'moment';
import moment from 'moment';
//import * as moment from 'moment';
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
  async login(@Req() req, @Headers() headers, @Res() res) {
    type User = {
      email?: string;
      role?: string;
    };
    console.log({ req });
    const headersData = headers.authorization.split('Basic ')[1];
    console.log({ headersData });
    const data = Base64.decode(headersData); 
    console.log({ data });
    try {
      const user: User = await this.userLoginService.findUserLogin(
        data.split(':')[0],
        data.split(':')[1],
      );
      console.log({ user });
      let allUserList = await this.getListAllCustomer()
      //console.log({allUserList})
      let userInfo = await allUserList.filter((data)=>{
        if(data.email==user.email)
        {
          return data
        }
      })
      let userDetaild = {
        firstName:userInfo[0].dataValues.user_customer.first_name,
        lastName:userInfo[0].dataValues.user_customer.last_name,
        email:userInfo[0].dataValues.email,
        birthDate:userInfo[0].dataValues.user_customer.birth_date,
        phoneNumber:userInfo[0].dataValues.user_customer.phone_number,
        country:userInfo[0].dataValues.user_customer.country,
        province:userInfo[0].dataValues.user_customer.province,
        city:userInfo[0].dataValues.user_customer.city,
        zipCode:userInfo[0].dataValues.user_customer.zip_code,
        address:userInfo[0].dataValues.user_customer.address
      }
      res.status(200).json({result:await this.authService.generateUserToken(userDetaild)}) ;
    } catch (err) {
      console.log({ err });
      res.status(403).json({result:"user not found"});
    }
  }

  @Post('/delete')
  async deleteUser(@Req() req) {
    try {
      const result = await this.userLoginService.deleteUser(req.body.username);
      return result
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
  async registerUser(@Req() req,@Res() res) {
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
      res.status(201).json({result:'user created successufuly'})
    } catch (err) {
      console.log(err);
      res.status(409).json({result:"email or phonenumber already in use"})
    }
    //console.log({userLoginEntity},{userCustomerEntity})
  }
}

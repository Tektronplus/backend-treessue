import {
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  Headers,
  Res,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserCustomerService } from '../user-customer/user-customer.service';

import * as bcrypt from 'bcrypt';
import moment from 'moment';
import { Base64 } from 'js-base64';

@UseGuards(ApiKeyAuthGuard)
@Controller('user-login')
export class UserLoginController {
  constructor(
    private readonly userLoginService: UserLoginService,
    private authService: AuthService,
    private userCustomerService: UserCustomerService,
  ) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Login!';
  }

  @Get('/all')
  async getListUsers(): Promise<Array<any>> {
    return this.userLoginService.findAll();
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
      console.log({user})
      if(user != undefined)
      {
        const userDetail = await this.userCustomerService.findUserDetail(user);
        //console.log({ user });
        res.status(200).json({
          result: await this.authService.generateUserToken(userDetail),
        });
      }
      else
      {
        res.status(403).json({ result: 'user not found' });
      }
    } catch (err) 
    {
      console.log( err );
      res.status(500).json({ result: 'internal server error' });

    }
  }

  @Put('/updateCredentials')
  async updateCredentials(@Body() body, @Headers() headers, @Res() res) {
    type decodedToken = {
      userDetail?: object;
      exp?: number;
      iat?: number;
    };

    console.log({ body }, { headers });
    const isTokenValid = await this.authService.validateToken(
      headers.authorization,
    );
    if (isTokenValid) {
      const decodedInfo: decodedToken =
        await this.authService.dechiperUserToken(headers.authorization);
      console.log({ decodedInfo });
      const saltOrRounds = 10;
      const salt = await bcrypt.genSalt(saltOrRounds);
      const newPassword = await bcrypt.hash(body.newPassword, salt);
      try {
        await this.userLoginService.updateUser(
          decodedInfo.userDetail,
          newPassword,
        );
        res.status(200).json({ result: 'succesful request' });
      } catch (err) {
        res.status(500).json({ result: 'internal server error' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Delete('/delete')
  async deleteUser(@Req() req, @Headers() headers, @Res() res) {
    console.log({ req });
    type decodedToken = {
      userDetail?: object;
      exp?: number;
      iat?: number;
    };
    const token = headers.authorization.split("Bearer ")[1]
    console.log('============== DELETE REQUEST =================');
    const isTokenValid = await this.authService.validateToken(
      token,
    );
    console.log({ isTokenValid });
    if (isTokenValid) {
      const decodedInfo: decodedToken =
        await this.authService.dechiperUserToken(token);
      const user = decodedInfo.userDetail;
      //console.log("user in controller: ",{user})
      try {
        const result = await this.userLoginService.deleteUser(user);
        if (result == 1) {
          res.status(200).json({ result: 'delete successful' });
        } else {
          res.status(403).json({ result: 'user not found' });
        }
      } catch (err) {
        console.log({ err });
        res.status(500).json({ result: 'internal server error' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }
}

@UseGuards(ApiKeyAuthGuard)
@Controller('user-registration')
export class UserRegisterController {
  constructor(
    private readonly userCustomerService: UserCustomerService,
    private userLoginService: UserLoginService,
  ) {}

  @Post('/registerCustomer')
  async registerUser(@Req() req, @Res() res) {
    const newUser = req.body;
    console.log({ newUser });
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(newUser.password, salt);
    const userLoginEntity = {
      userCustomer: '',
      email: newUser.email,
      password: hash,
      is_active: true,
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
    const userCustomerData = await this.userCustomerService.verifyUserData(
      userCustomerEntity,
    );
    if (userCustomerData != null) {
      //USER CUSTOMER ESISTE
      const result = await this.userCustomerService.updateInfoLogin(
        userCustomerData.dataValues,
        userCustomerEntity,
      );
      console.log({ result });
      userLoginEntity.userCustomer = result;
      const userLoginData = await this.userLoginService.verifyUserLogin(
        userLoginEntity,
      );
      if (userLoginData == null) {
        //NON ESISTONO INFORMAZIONI DELLA LOGIN
        console.log("USER CUSTOMER ESISTE, NON ESISTE L'ENTITA LOGIN");
        console.log({ userLoginEntity });
        try {
          const newCreatedUserLogin = await this.userLoginService.createUser(
            userLoginEntity,
          );
          console.log({ newCreatedUserLogin });
          res.status(201).json({ result: 'user created successufuly' });
        } catch (err) {
          console.log(
            '================================ ERRORE  ===============================',
          );
          console.log({ err });
        }
      } else {
        if (userLoginData.is_active == 1) {
          console.log("USER CUSTOMER ESISTE, ESISTE L'ENTITA LOGIN ATTIVA");
          res
            .status(409)
            .json({ result: 'email or phonenumber already in use' });
        } else {
          console.log('USER CUSTOMER ESISTE, ESISTE ENTITA LOGIN NON ATTIVA');
          try {
            const newCreatedUserLogin = await this.userLoginService.createUser(
              userLoginEntity,
            );
            console.log({ newCreatedUserLogin });
            res.status(201).json({ result: 'user created successufuly' });
          } catch (err) {
            console.log(
              '================================ ERRORE  ===============================',
            );
            console.log(err);
            if ((err = 'ER_DUP_ENTRY')) {
              try {
                await this.userLoginService.updateUserStatus(
                  userLoginEntity.email,
                );
                res.status(201).json({ result: 'user created successufuly' });
              } catch (err) {
                res.status(500).json({ result: 'internal server error' });
              }
            } else {
              res.status(500).json({ result: 'internal server error' });
            }
          }
        }
      }
    } else {
      //NON ESISTE ENTITA USER CUSTOMER
      const userLoginData = await this.userLoginService.verifyUserLogin(
        userLoginEntity,
      );
      if (userLoginData == null) {
        console.log("USER CUSTOMER NON ESISTE, NON ESISTE L'ENTITA LOGIN");
        //NON ESISTE ENITITA USER LOGIN
        const newCreatedUserCustomer =
          await this.userCustomerService.createUser(userCustomerEntity);
        console.log({ newCreatedUserCustomer });
        userLoginEntity.userCustomer = newCreatedUserCustomer.id_user_customer;
        console.log({ userLoginEntity });
        try {
          const newCreatedUserLogin = await this.userLoginService.createUser(
            userLoginEntity,
          );
          console.log({ newCreatedUserLogin });
          res.status(201).json({ result: 'user created successufuly' });
        } catch (err) {
          if ((err = 'ER_DUP_ENTRY'))
          {
            res.status(422).json({ result: 'duplicate entity, verify the email is correct' });
            return
          }
          else
          {
            res.status(500).json({ result: 'internal server error' });
            return
          } 
        }
      } else {
        console.log("USER CUSTOMER NON ESISTE, ESISTE L'ENTITA LOGIN ");
        res.status(409).json({ result: 'email or phonenumber already in use' });
      }
    }
  }
}

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
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import * as bcrypt from 'bcrypt';
import { Base64 } from 'js-base64';
import { AuthService } from 'src/auth/auth.service';

import { UserLoginService } from 'src/user-login/user-login.service';
import { UserCustomerService } from 'src/user-customer/user-customer.service';
import { UserWorkerService } from 'src/user-worker/user-worker.service';
import { TowerService } from 'src/tower/tower.service';
import { ProductService } from 'src/product/product.service';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { OrderService } from 'src/order/order.service';
import { CartDetailService } from 'src/cart-detail/cart-detail.service';

@UseGuards(ApiKeyAuthGuard)
@Controller('backOffice')
export class BackOfficeController {
  constructor(
    private userWorkerService: UserWorkerService,
    private userLoginService: UserLoginService,
    private userCustomerService: UserCustomerService,
    private authService: AuthService,
  ) {}

  @Get('/getAllCustomer')
  async getAllCustomer() {
    return await this.userLoginService.findAllCustomer();
  }

  @Get('/customerDetail')
  async getCustomerDetail(@Body() body) {
    const user = body;
    const foundUser = await this.userLoginService.verifyUserLogin(user);
    console.log({ foundUser });
    const detail = await this.userCustomerService.findUserDetail(
      foundUser.dataValues,
    );
    console.log({ detail });
    return detail;
  }

  @Post('/createWorker')
  async createWorker(@Req() req, @Res() res) {
    const newUser = req.body;
    console.log({ newUser });
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(newUser.password, salt);
    const userLoginEntity = {
      userCustomer: '',
      email: newUser.email,
      password: hash,
      role: 'worker',
      is_active: true,
    };
    const userWorkerEntity = {
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      role: newUser.role,
    };
    const userWorkerData = await this.userWorkerService.verifyUserWorker(
      userWorkerEntity,
    );
    console.log({ userWorkerData });
    if (userWorkerData != null) {
      //USER WORKER ESISTE
      let userLoginData = await this.userLoginService.verifyUserLogin(
        userLoginEntity,
      );
      if (userLoginData == null) {
        //NON ESISTONO INFORMAZIONI DELLA LOGIN
        console.log("USER WORKER ESISTE, NON ESISTE L'ENTITA LOGIN");
        console.log({ userLoginEntity });
        userLoginEntity.userCustomer = userWorkerData.id_user_worker;
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
          console.log("USER WORKER ESISTE, ESISTE L'ENTITA LOGIN ATTIVA");
          res
            .status(409)
            .json({ result: 'email already in use for another user' });
        } else {
          console.log('USER WORKER ESISTE, ESISTE ENTITA LOGIN NON ATTIVA');
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
              console.log('ciao');
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
      let userLoginData = await this.userLoginService.verifyUserLogin(
        userLoginEntity,
      );
      if (userLoginData == null) {
        console.log("USER WORKER NON ESISTE, NON ESISTE L'ENTITA LOGIN");
        //NON ESISTE ENITITA USER LOGIN
        let newCreateduserWorker =
          await this.userWorkerService.createUserWorker(userWorkerEntity);
        console.log({ newCreateduserWorker });
        userLoginEntity.userCustomer = newCreateduserWorker.id_user_worker;
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
        console.log("USER WORKER NON ESISTE, ESISTE L'ENTITA LOGIN ");
        res
          .status(409)
          .json({ result: 'email already in use for another user' });
      }
    }
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
      const user: User = await this.userWorkerService.findUserWorkerLogin(
        data.split(':')[0],
        data.split(':')[1],
      );

      const userDetail = await this.userWorkerService.findUserDetail(user);
      //console.log({ user });
      res.status(200).json({
        result: await this.authService.generateUserToken(userDetail),
      });
    } catch (err) {
      console.log({ err });
      res.status(403).json({ result: 'user not found' });
    }
  }
}

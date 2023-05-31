import {
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  Headers,
  Res,
  Body,
  Param,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import moment from 'moment';

import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from '../auth/auth.service';

import { UserLoginService } from '../user-login/user-login.service';
import { UserCustomerService } from '../user-customer/user-customer.service';

@UseGuards(ApiKeyAuthGuard)
@Controller('backOfficeCustomer')
export class BackOfficeCustomerController {
  constructor(
    private userLoginService: UserLoginService,
    private userCustomerService: UserCustomerService,
    private authService: AuthService,
  ) {}

  @Get('/getAllCustomer')
  async getAllCustomer(@Headers() headers, @Res() res) {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: 'bad request' });
      return;
    }
    if (headers.authorization.substring(0, 7) != 'Bearer ') {
      res.status(401).json({ result: 'not authorized' });
      return;
    }

    const token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role == 'admin' ||
        dechiperAuth.userDetail.role == 'ufficio' ||
        dechiperAuth.userDetail.role == 'magazzino' ||
        dechiperAuth.userDetail.role == 'torrista'
      ) {
        try {
          const allCustomerList = await this.userLoginService.findAllCustomer();
          console.log({ allCustomerList });
          res.status(200).json(allCustomerList);
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
          return;
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return;
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return;
    }
  }

  @Get('/customerDetail/:id')
  async getCustomerDetail(@Param() param, @Headers() headers, @Res() res) {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: 'bad request' });
      return;
    }
    if (headers.authorization.substring(0, 7) != 'Bearer ') {
      res.status(401).json({ result: 'not authorized' });
      return;
    }

    const token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role == 'admin' ||
        dechiperAuth.userDetail.role == 'ufficio' ||
        dechiperAuth.userDetail.role == 'magazzino'
      ) {
        try {
          const id = param.id;
          console.log({ id });
          const foundUser = await this.userLoginService.findUserById(id);
          console.log({ foundUser });
          const detail = await this.userCustomerService.findUserDetail(
            foundUser.dataValues,
          );
          detail.id = id;
          console.log({ detail });
          Object.assign(detail, { is_active: foundUser.dataValues.is_active });
          res.status(200).json(detail);
          return;
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return;
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return;
    }
  }

  @Post('/registerCustomer')
  async registerUser(@Req() req, @Headers() headers, @Body() body, @Res() res) {
    if (headers.authorization == undefined) {
      res.status(404).json({ result: 'bad request' });
      return;
    }
    if (headers.authorization.substring(0, 7) != 'Bearer ') {
      res.status(401).json({ result: 'not authorized' });
      return;
    }

    if (
      body.first_name == undefined ||
      body.last_name == undefined ||
      body.email == undefined ||
      body.password == undefined
    ) {
      res.status(404).json({ result: 'bad request' });
      return;
    }

    const token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role == 'admin' ||
        dechiperAuth.userDetail.role == 'ufficio'
      ) {
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
        const userBirthDate = () => {
          if (newUser.birth_date && newUser.birth_date != "") {
            return moment(newUser.birth_date, 'YYYY-MM-DD').toDate();
          }
          return null;
        };
        const userCustomerEntity = {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          birth_date: userBirthDate(),
          phone_number: newUser.phone_number,
          country: newUser.country,
          province: newUser.province,
          city: newUser.city,
          zip_code: newUser.zip_code,
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
              return;
            } catch (err) {
              res.status(500).json({ result: 'internal server error riga 198' });
              return;
            }
          } else {
            if (userLoginData.is_active == 1) {
              console.log("USER CUSTOMER ESISTE, ESISTE L'ENTITA LOGIN ATTIVA");
              res
                .status(409)
                .json({ result: 'email or phonenumber already in use' });
              return;
            } else {
              console.log('USER CUSTOMER ESISTE, ESISTE ENTITA LOGIN NON ATTIVA');
              try {
                const newCreatedUserLogin = await this.userLoginService.createUser(
                  userLoginEntity,
                );
                console.log({ newCreatedUserLogin });
                res.status(201).json({ result: 'user created successufuly' });
                return;
              } catch (err) {
                console.log(
                  '================================ ERRORE  ===============================',
                );
                console.log(err);
                if (err = 'ER_DUP_ENTRY') {
                  try {
                    await this.userLoginService.updateUserStatus(
                      userLoginEntity.email,
                    );
                    res.status(201).json({ result: 'user created successufuly' });
                    return;
                  } catch (err) {
                    res.status(500).json({ result: 'internal server error riga 230' });
                    return;
                  }
                } else {
                  res.status(500).json({ result: 'internal server error riga 234' });
                  return;
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
              if (err = 'ER_DUP_ENTRY') {
                res.status(422).json({
                  result: 'duplicate entity, verify the email is correct',
                });
                return;
              } else {
                res.status(500).json({ result: 'internal server error riga 266' });
                return;
              }
            }
          } else {
            console.log("USER CUSTOMER NON ESISTE, ESISTE L'ENTITA LOGIN ");
            res.status(409).json({ result: 'email or phonenumber already in use' });
            return;
          }
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return;
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return;
    }
  }
}

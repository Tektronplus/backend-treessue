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
  Param,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from '../auth/auth.service';

import { UserLoginService } from '../user-login/user-login.service';
import { UserCustomerService } from '../user-customer/user-customer.service';
import { UserWorkerService } from '../user-worker/user-worker.service';
import { UserWorkerLoginService } from '../user-worker-login/user-worker-login.service';
import { UserWorkerRoleService } from '../user-worker-role/user-worker-role.service';
@UseGuards(ApiKeyAuthGuard)
@Controller('backOffice')
export class BackOfficeController {
  constructor(
    private userWorkerService: UserWorkerService,
    private userLoginService: UserLoginService,
    private userWorkerLoginService: UserWorkerLoginService,
    private userCustomerService: UserCustomerService,
    private authService: AuthService,
    private workerRoleService: UserWorkerRoleService,
  ) {}

  @Get('getAllRole')
  async getRoleList(@Headers() headers, @Res() res) {
    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    //console.log({isTokenValid})
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      console.log({ dechiperAuth });
      if (dechiperAuth.userDetail.role == 'admin') {
        //console.log("ciao")
        try {
          let roleList = await this.workerRoleService.getListRole();
          res.status(200).json(roleList);
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Get('/getAllCustomer')
  async getAllCustomer(@Headers() headers, @Res() res) {
    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role != 'admin' ||
        dechiperAuth.userDetail.role != 'commerciale'
      ) {
        try {
          let allCustomerList = await this.userLoginService.findAllCustomer();
          console.log({ allCustomerList });
          res.status(200).json(allCustomerList);
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Get('/getAllWorker')
  async getAllWorker(@Headers() headers, @Res() res) {
    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role != 'admin' ||
        dechiperAuth.userDetail.role != 'commerciale'
      ) {
        try {
          let allWorkerList = await this.userWorkerLoginService.findAllWoker();
          //console.log({allWorkerList})
          for (let elm of allWorkerList) {
            elm.role = await this.workerRoleService.findRoleById(elm.role);
            elm.role = elm.role.role;
          }
          console.log({ allWorkerList });
          res.status(200).json(allWorkerList);
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Get('/customerDetail/:id')
  async getCustomerDetail(@Param() param, @Headers() headers, @Res() res) {
    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role != 'admin' ||
        dechiperAuth.userDetail.role != 'commerciale'
      ) {
        try {
          const id = param.id;
          console.log({ id });
          const foundUser = await this.userLoginService.findUserById(id);
          console.log({ foundUser });
          const detail = await this.userCustomerService.findUserDetail(
            foundUser.dataValues,
          );
          console.log({ detail });
          Object.assign(detail, { is_active: foundUser.dataValues.is_active });
          res.status(200).json(detail);
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Get('/workerDetail/:id')
  async getWorkerDetail(@Param() param, @Headers() headers, @Res() res) {
    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role != 'admin' ||
        dechiperAuth.userDetail.role != 'commerciale'
      ) {
        try {
          const id = param.id;
          console.log({ id });
          const foundWorker = await this.userWorkerLoginService.findUserById(
            id,
          );
          console.log({ foundWorker });
          const detail = await this.userWorkerService.findUserDetail(
            foundWorker.dataValues,
          );
          const role = await this.workerRoleService.findRoleById(
            detail.id_role,
          );
          const resultDetail = {
            id: detail.id,
            email: foundWorker.dataValues.email,
            first_name: detail.first_name,
            last_name: detail.last_name,
            is_active: foundWorker.dataValues.is_active,
            role: role.role,
          };
          res.status(200).json(resultDetail);
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Post('/createWorker')
  async createWorker(@Req() req, @Res() res, @Headers() headers) {
    //console.log(headers.authorization)
    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (dechiperAuth.userDetail.role == 'admin') {
        const newUser = req.body;
        console.log({ newUser });
        const saltOrRounds = 10;
        const salt = await bcrypt.genSalt(saltOrRounds);
        const hash = await bcrypt.hash(newUser.password, salt);
        const userWorkerLoginEntity = {
          id_user_worker: '',
          email: newUser.email,
          password: hash,
          is_active: true,
        };
        let role = await this.workerRoleService.findRoleId(newUser.role);
        console.log({ role });
        const userWorkerEntity = {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          id_user_worker_role: role.id_user_worker_role,
        };

        const userWorkerData = await this.userWorkerService.verifyUserWorker(
          userWorkerEntity,
        );
        console.log({ userWorkerData });
        if (userWorkerData != null) {
          //USER WORKER ESISTE
          let userWorkerLoginData =
            await this.userWorkerLoginService.verifyUserWorker(
              userWorkerLoginEntity,
            );
          if (userWorkerLoginData == null) {
            //NON ESISTONO INFORMAZIONI DELLA LOGIN
            console.log("USER WORKER ESISTE, NON ESISTE L'ENTITA LOGIN");
            console.log({ userWorkerEntity });
            userWorkerLoginEntity.id_user_worker =
              userWorkerData.id_user_worker;
            try {
              const newCreatedUserWorkerLogin =
                await this.userWorkerLoginService.createUserWorker(
                  userWorkerLoginEntity,
                );
              console.log({ newCreatedUserWorkerLogin });
              res.status(201).json({ result: 'user created successufuly' });
            } catch (err) {
              console.log(
                '================================ ERRORE  ===============================',
              );
              console.log({ err });
            }
          } else {
            if (userWorkerLoginData.is_active == 1) {
              console.log("USER WORKER ESISTE, ESISTE L'ENTITA LOGIN ATTIVA");
              res
                .status(409)
                .json({ result: 'email already in use for another user' });
            } else {
              console.log('USER WORKER ESISTE, ESISTE ENTITA LOGIN NON ATTIVA');
              try {
                const newCreatedUserWorkerLogin =
                  await this.userWorkerLoginService.createUserWorker(
                    userWorkerEntity,
                  );
                console.log({ newCreatedUserWorkerLogin });
                res.status(201).json({ result: 'user created successufuly' });
              } catch (err) {
                console.log(
                  '================================ ERRORE  ===============================',
                );
                console.log(err);
                if ((err = 'ER_DUP_ENTRY')) {
                  try {
                    await this.userWorkerLoginService.updateUserStatus(
                      userWorkerLoginEntity.email,
                    );
                    res
                      .status(201)
                      .json({ result: 'user created successufuly' });
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
          //NON ESISTE ENTITA USER WORKER
          let userWorkerLoginData =
            await this.userWorkerLoginService.verifyUserWorker(
              userWorkerLoginEntity,
            );
          if (userWorkerLoginData == null) {
            console.log("USER WORKER NON ESISTE, NON ESISTE L'ENTITA LOGIN");
            //NON ESISTE ENITITA USER LOGIN
            let newCreateduserWorker =
              await this.userWorkerService.createUserWorker(userWorkerEntity);
            console.log({ newCreateduserWorker });
            userWorkerLoginEntity.id_user_worker =
              newCreateduserWorker.id_user_worker;
            console.log({ userWorkerLoginEntity });
            try {
              const newCreatedUserWorkerLogin =
                await this.userWorkerLoginService.createUserWorker(
                  userWorkerLoginEntity,
                );
              console.log({ newCreatedUserWorkerLogin });
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
      } else {
        res.status(403).json({ result: 'not authorized' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Post('newRole')
  async addRole(@Headers() headers, @Body() body, @Res() res) {
    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      //console.log({dechiperAuth})
      if (dechiperAuth.userDetail.role == 'admin') {
        let newRole = body.role;
        let existingRole = await this.workerRoleService.findRoleId(newRole);
        console.log({ existingRole });
        if (existingRole == undefined) {
          try {
            await this.workerRoleService.createRole(body.role);
            res.status(201).json({ result: 'role created successufuly' });
          } catch (err) {
            res.status(500).json({ result: 'internal server error' });
          }
        } else {
          res.status(409).json({ result: 'role exist already' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Delete('/deleteWorker/:id')
  async deleteWorker(@Param() param, @Headers() headers, @Res() res) {
    console.log('============== DELETE REQUEST =================');
    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    console.log({ isTokenValid });
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      //console.log({dechiperAuth})
      if (dechiperAuth.userDetail.role == 'admin') {
        let iduser = param.id;
        //console.log("user in controller: ",{user})
        console.log({ iduser });
        try {
          const result = await this.userWorkerLoginService.deleteWorker(iduser);
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
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Put('/modifyUserCustomerDetail')
  async modifyUserInfo(@Headers() headers, @Body() body, @Res() res) {
    console.log({ body }, { headers });
    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo = await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      if (decodedInfo.userDetail.role == 'ufficio') {
        const existingRecord = await this.userCustomerService.findOneById(
          body.id,
        );
        console.log({ existingRecord });
        let existingValue = {
          id: existingRecord.id_user_customer,
          first_name: existingRecord.first_name,
          last_name: existingRecord.last_name,
          birth_date: existingRecord.birth_date,
          phone_number: existingRecord.phone_number,
          country: existingRecord.country,
          province: existingRecord.province,
          city: existingRecord.city,
          zip_code: existingRecord.zip_code,
          address: existingRecord.address,
        };
        try {
          await this.userCustomerService.updateDetail(existingValue, body);
          res.status(200).json({ result: 'successful' });
        } catch (err) {
          console.log({ err });
          res.status(500).json({ result: 'internal server error' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }

  @Put('/modifyUserWorkerDetail/:id')
  async changeUserWorkerRole(
    @Param() Param,
    @Headers() headers,
    @Body() body,
    @Res() res,
  ) {
    console.log({ body }, { headers });
    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo = await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      if (decodedInfo.userDetail.role == 'admin') {
        const updatedUserWorkerDetail = {
          first_name: body.first_name,
          last_name: body.last_name,
          id_user_worker_role: body.role,
        };
        const foundWorkerLoginData =
          await this.userWorkerLoginService.findUserById(Param.id);
        const foundWorkerDetail = await this.userWorkerService.findUserDetail(
          foundWorkerLoginData.dataValues,
        );
        console.log({ foundWorkerDetail });
        const roleId = await this.workerRoleService.findRoleId(
          updatedUserWorkerDetail.id_user_worker_role,
        );
        console.log({ roleId });
        updatedUserWorkerDetail.id_user_worker_role =
          roleId.dataValues.id_user_worker_role;
        try {
          await this.userWorkerService.updateDetail(
            foundWorkerDetail,
            updatedUserWorkerDetail,
          );
          res.status(200).json({ result: 'successful' });
        } catch (err) {
          console.log({ err });
          res.status(500).json({ result: 'internal server error' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
    }
  }
}

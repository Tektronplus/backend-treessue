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
import moment from 'moment';

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
    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    //console.log({isTokenValid})
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      console.log({ dechiperAuth });
      if (dechiperAuth.userDetail.role == 'admin') {
        try {
          let roleList = await this.workerRoleService.getListRole();
          res.status(200).json(roleList);
          return
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
          return
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }

  @Get('/getAllCustomer')
  async getAllCustomer(@Headers() headers, @Res() res) {
    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role != 'admin' ||
        dechiperAuth.userDetail.role != 'ufficio'
      ) {
        try {
          let allCustomerList = await this.userLoginService.findAllCustomer();
          console.log({ allCustomerList });
          res.status(200).json(allCustomerList);
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
          return
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }

  @Get('/getAllWorker')
  async getAllWorker(@Headers() headers, @Res() res) {

    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role != 'admin' ||
        dechiperAuth.userDetail.role != 'ufficio'
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
          return
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
          return
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }

  @Get('/customerDetail/:id')
  async getCustomerDetail(@Param() param, @Headers() headers, @Res() res) {

    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role != 'admin' ||
        dechiperAuth.userDetail.role != 'ufficio'
      ) {
        try {
          const id = param.id;
          console.log({ id });
          const foundUser = await this.userLoginService.findUserById(id);
          console.log({ foundUser });
          const detail = await this.userCustomerService.findUserDetail(
            foundUser.dataValues,
          );
          detail.id = id
          console.log({ detail });
          Object.assign(detail, { is_active: foundUser.dataValues.is_active });
          res.status(200).json(detail);
          return
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }

  @Get('/workerDetail/:id')
  async getWorkerDetail(@Param() param, @Headers() headers, @Res() res) {

    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (
        dechiperAuth.userDetail.role != 'admin' ||
        dechiperAuth.userDetail.role != 'ufficio'
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
            id: param.id,
            email: foundWorker.dataValues.email,
            first_name: detail.first_name,
            last_name: detail.last_name,
            is_active: foundWorker.dataValues.is_active,
            role: role.role,
          };
          res.status(200).json(resultDetail);
          return
        } catch (err) {
          res.status(500).json({ result: 'internal server error' });
          return
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }

  @Post('/registerCustomer')
  async registerUser(@Req() req, @Headers() headers, @Res() res) 
  {
    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) 
    {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (dechiperAuth.userDetail.role != 'admin' || dechiperAuth.userDetail.role != 'ufficio')
      {
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
              return
            } 
            catch (err) 
            {
              console.log({ err });
              res.status(500).json({ result: 'internal server error' });
              return
            }
          } else {
            if (userLoginData.is_active == 1) {
              console.log("USER CUSTOMER ESISTE, ESISTE L'ENTITA LOGIN ATTIVA");
              res
                .status(409)
                .json({ result: 'email or phonenumber already in use' });
                return
            } else {
              console.log('USER CUSTOMER ESISTE, ESISTE ENTITA LOGIN NON ATTIVA');
              try {
                const newCreatedUserLogin = await this.userLoginService.createUser(
                  userLoginEntity,
                );
                console.log({ newCreatedUserLogin });
                res.status(201).json({ result: 'user created successufuly' });
                return
              } catch (err) {
                console.log(
                );
                console.log(err);
                if ((err = 'ER_DUP_ENTRY')) 
                {
                  try {
                    await this.userLoginService.updateUserStatus(
                      userLoginEntity.email,
                    );
                    res.status(201).json({ result: 'user created successufuly' });
                    return
                  } catch (err) {
                    res.status(500).json({ result: 'internal server error' });
                    return
                  }
                } else {
                  res.status(500).json({ result: 'internal server error' });
                  return
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
              console.log({ err });
              res.status(500).json({result:"internal server error"})
              return
            }
          } else {
            console.log("USER CUSTOMER NON ESISTE, ESISTE L'ENTITA LOGIN ");
            res.status(409).json({ result: 'email or phonenumber already in use' });
            return
          }
        }
      }
      else
      {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    }
    else
    {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }

  @Post('/createWorker')
  async createWorker(@Req() req, @Res() res, @Headers() headers) {

    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

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
              return
            } catch (err) {
              console.log({ err });
              res.status(500).json({result:"internal server error"})
            }
          } else {
            if (userWorkerLoginData.is_active == 1) {
              console.log("USER WORKER ESISTE, ESISTE L'ENTITA LOGIN ATTIVA");
              res
                .status(409)
                .json({ result: 'email already in use for another user' });
                return
            } else {
              console.log('USER WORKER ESISTE, ESISTE ENTITA LOGIN NON ATTIVA');
              try {
                const newCreatedUserWorkerLogin =
                  await this.userWorkerLoginService.createUserWorker(
                    userWorkerEntity,
                  );
                console.log({ newCreatedUserWorkerLogin });
                res.status(201).json({ result: 'user created successufuly' });
                return
              } catch (err) {
                console.log(err);
                if ((err = 'ER_DUP_ENTRY')) {
                  try {
                    await this.userWorkerLoginService.updateUserStatus(
                      userWorkerLoginEntity.email,
                    );
                    res
                      .status(201)
                      .json({ result: 'user created successufuly' });
                      return
                  } catch (err) {
                    res.status(500).json({ result: 'internal server error' });
                    return
                  }
                } else {
                  res.status(500).json({ result: 'internal server error' });
                  return
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
              return
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
            console.log("USER WORKER NON ESISTE, ESISTE L'ENTITA LOGIN ");
            res
              .status(409)
              .json({ result: 'email already in use for another user' });
              return
          }
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }

  @Post('newRole')
  async addRole(@Headers() headers, @Body() body, @Res() res) {

    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

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
            return
          } catch (err) {
            res.status(500).json({ result: 'internal server error' });
            return
          }
        } else {
          res.status(409).json({ result: 'role exist already' });
          return
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }

  @Delete('/deleteWorker/:id')
  async deleteWorker(@Param() param, @Headers() headers, @Res() res) {

    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

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
            return
          } 
          else 
          {
            res.status(404).json({ result: 'user not found' });
            return
          }
        } catch (err) {
          console.log({ err });
          res.status(500).json({ result: 'internal server error' });
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }

  @Put('/modifyUserCustomerDetail/:id')
  async modifyUserInfo(@Headers() headers, @Body() body, @Param() param, @Res() res) {
    console.log({ body }, { headers });


    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

    let token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const decodedInfo = await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      if (decodedInfo.userDetail.role == 'ufficio' || decodedInfo.userDetail.role == "admin") {
        const userLoginData = await this.userLoginService.findUserById(param.id)
        const existingRecord = await this.userCustomerService.findOneById(
          userLoginData.dataValues.id_user_customer,
        );
        console.log({ existingRecord });
        let existingValue = {
          id: existingRecord.dataValues.id_user_customer,
          first_name: existingRecord.dataValues.first_name,
          last_name: existingRecord.dataValues.last_name,
          birth_date: existingRecord.dataValues.birth_date,
          phone_number: existingRecord.dataValues.phone_number,
          country: existingRecord.dataValues.country,
          province: existingRecord.dataValues.province,
          city: existingRecord.dataValues.city,
          zip_code: existingRecord.dataValues.zip_code,
          address: existingRecord.dataValues.address,
        }; 
        try {
          let result = await this.userCustomerService.updateDetail(existingValue, body);
          res.status(200).json({ result: 'successful' });
          return
        } catch (err) {
          if ((err = 'ER_DUP_ENTRY'))
          {
            res.status(422).json({ result: 'duplicate entity, verify one or more of your information are correct' });
            return
          }
          else
          {
            res.status(500).json({ result: 'internal server error' });
            return
          } 
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }

  @Put('/modifyUserWorkerIsActive/:id')
  async reactivateUser(@Param() Param, @Headers() headers, @Res() res) 
  {
    console.log({ headers });

    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

    let token = headers.authorization.split("Bearer ")[1]
    console.log({token})
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) 
    {
      const decodedInfo = await this.authService.dechiperUserToken(token);
      console.log({ decodedInfo });
      if(decodedInfo.userDetail.role == "admin")
      {

        const foundWorkerLoginData = await this.userWorkerLoginService.findUserById(Param.id)

        console.log({foundWorkerLoginData})

        try 
        {
          await this.userWorkerLoginService.updateUserStatus(foundWorkerLoginData.email)
          res.status(200).json({ result: 'successful' });
          return
        } 
        catch (err) 
        {
          console.log({err})
          res.status(500).json({ result: 'internal server error' });
          return
        }
      }
      else
      { 
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } 
    else 
    {
      res.status(403).json({ result: 'not authorized' });
      return
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

    if(headers.authorization == undefined)
    {
      res.status(404).json({ result: 'bad request' });
      return
    }
    if(headers.authorization.substring(0,7) != "Bearer ")
    {
      res.status(401).json({ result: 'not authorized' });
      return
    }

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
          return
        } catch (err) {
          console.log({ err });
          res.status(500).json({ result: 'internal server error' });
          return
        }
      } else {
        res.status(403).json({ result: 'not authorized' });
        return
      }
    } else {
      res.status(403).json({ result: 'not authorized' });
      return
    }
  }
}

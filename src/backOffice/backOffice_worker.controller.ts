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

import { UserWorkerService } from '../user-worker/user-worker.service';
import { UserWorkerLoginService } from '../user-worker-login/user-worker-login.service';
import { UserWorkerRoleService } from '../user-worker-role/user-worker-role.service';
@UseGuards(ApiKeyAuthGuard)
@Controller('backOfficeWorker')
export class BackOfficeWorkerController {
  constructor(
    private userWorkerService: UserWorkerService,
    private userWorkerLoginService: UserWorkerLoginService,
    private workerRoleService: UserWorkerRoleService,

    private authService: AuthService,
  ) {}

  @Get('/getAllWorker')
  async getAllWorker(@Headers() headers, @Res() res) {
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
        dechiperAuth.userDetail.role == 'ufficio'
      ) {
        try {
          const allWorkerList =
            await this.userWorkerLoginService.findAllWoker();
          //console.log({allWorkerList})
          for (const elm of allWorkerList) {
            elm.role = await this.workerRoleService.findRoleById(elm.role);
            elm.role = elm.role.role;
          }
          console.log({ allWorkerList });
          res.status(200).json(allWorkerList);
          return;
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

  @Get('/workerDetail/:id')
  async getWorkerDetail(@Param() param, @Headers() headers, @Res() res) {
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
        dechiperAuth.userDetail.role == 'ufficio'
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
          return;
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

  @Post('/createWorker')
  async createWorker(@Req() req, @Res() res, @Body() body, @Headers() headers) {
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
      body.role == undefined
    ) {
      res.status(404).json({ result: 'bad request' });
      return;
    }

    const token = headers.authorization.split('Bearer ')[1];
    console.log({ token });
    const isTokenValid = await this.authService.validateToken(token);
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      if (dechiperAuth.userDetail.role == 'admin')
      {
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
        const role = await this.workerRoleService.findRoleId(newUser.role);
        console.log({ role });
        const userWorkerEntity = {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          id_user_worker_role: role.id_user_worker_role,
        };

          const userWorkerLoginData = await this.userWorkerLoginService.verifyUserWorker(userWorkerLoginEntity);
            if (userWorkerLoginData == null)
            {
                console.log("USER WORKER NON ESISTE, NON ESISTE L'ENTITA LOGIN");
                const newCreateduserWorker = await this.userWorkerService.createUserWorker(userWorkerEntity);
                console.log({ newCreateduserWorker });
                userWorkerLoginEntity.id_user_worker = newCreateduserWorker.id_user_worker;
                console.log({ userWorkerLoginEntity });
                try 
                {
                    const newCreatedUserWorkerLogin = await this.userWorkerLoginService.createUserWorker(userWorkerLoginEntity);
                    console.log({ newCreatedUserWorkerLogin });
                    res.status(201).json({ result: 'user created successufuly' });
                    return;
                } 
                catch (err) 
                {
                    if ((err = 'ER_DUP_ENTRY')) 
                    {
                        res.status(422).json({result: 'duplicate entity, verify the email is correct'});
                        return;
                    } 
                    else 
                    {
                        res.status(500).json({ result: 'internal server error' });
                        return;
                    }
                }
            } 
            else 
            {
                console.log("USER WORKER NON ESISTE, ESISTE L'ENTITA LOGIN ");
                res.status(409).json({ result: 'email already in use for another user' });
                return;
            }
        }
    } 
    else 
    {
      res.status(403).json({ result: 'not authorized' });
      return;
    }
  }

  @Delete('/deleteWorker/:id')
  async deleteWorker(@Param() param, @Headers() headers, @Res() res) {
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
    console.log({ isTokenValid });
    if (isTokenValid) {
      const dechiperAuth = await this.authService.dechiperUserToken(token);
      //console.log({dechiperAuth})
      if (dechiperAuth.userDetail.role == 'admin') {
        const iduser = param.id;
        //console.log("user in controller: ",{user})
        console.log({ iduser });
        try {
          const result = await this.userWorkerLoginService.deleteWorker(iduser);
          if (result == 1) {
            res.status(200).json({ result: 'delete successful' });
            return;
          } else {
            res.status(404).json({ result: 'user not found' });
            return;
          }
        } catch (err) {
          console.log({ err });
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

  @Put('/modifyUserWorkerDetail/:id')
  async changeUserWorkerRole(
    @Param() Param,
    @Headers() headers,
    @Body() body,
    @Res() res,
  ) {
    console.log({ body }, { headers });

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
      body.role == undefined
    ) {
      res.status(404).json({ result: 'bad request' });
      return;
    }

    const token = headers.authorization.split('Bearer ')[1];
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
          await this.userWorkerLoginService.updateUserStatus(foundWorkerLoginData,body.is_active);
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
          return;
        } catch (err) {
          console.log({ err });
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
}

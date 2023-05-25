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
  Param
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
import { UserWorkerLoginService } from 'src/user-worker-login/user-worker-login.service';
import { UserWorkerRoleService } from 'src/user-worker-role/user-worker-role.service';

@UseGuards(ApiKeyAuthGuard)
@Controller('backOffice')
export class BackOfficeController{
  constructor(
    private userWorkerService:UserWorkerService,
    private userLoginService:UserLoginService,
    private userWorkerLoginService:UserWorkerLoginService,
    private userCustomerService:UserCustomerService,
    private authService:AuthService,
    private workerRoleService:UserWorkerRoleService
  ) {}

  @Get("/getAllCustomer")
  async getAllCustomer()
  {
    return await this.userLoginService.findAllCustomer()
  }

  @Get("/customerDetail/:id")
  async getCustomerDetail(@Param() param)
  {
    const id = param.id
    console.log({id})
    const foundUser = await this.userLoginService.findUserById(id)
    console.log({foundUser})
    const detail = await this.userCustomerService.findUserDetail(foundUser.dataValues)
    console.log({detail})
    return detail
  }

  @Post("/createWorker")
  async createWorker(@Req() req, @Res() res, @Headers() headers) 
  {
    //console.log(headers.authorization)
    const dechiperAuth = await this.authService.dechiperUserToken(headers.authorization)
    const isTokenValid = await this.authService.validateToken(headers.authorization)
    console.log({dechiperAuth},{isTokenValid})
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
    let role = await this.workerRoleService.findRoleId(newUser.role)
    console.log({role})
    const userWorkerEntity = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      id_user_worker_role: role.id_user_worker_role,
    };
    const userWorkerData = await this.userWorkerService.verifyUserWorker(userWorkerEntity)
    console.log({userWorkerData})
    if(userWorkerData != null)
    {
      //USER WORKER ESISTE
      let userWorkerLoginData = await this.userWorkerLoginService.verifyUserWorker(userWorkerLoginEntity)
      if(userWorkerLoginData == null)
      {
        //NON ESISTONO INFORMAZIONI DELLA LOGIN 
        console.log("USER WORKER ESISTE, NON ESISTE L'ENTITA LOGIN")
        console.log({ userWorkerEntity });
        userWorkerLoginEntity.id_user_worker = userWorkerData.id_user_worker
        try
        {
          const newCreatedUserWorkerLogin = await this.userWorkerLoginService.createUserWorker(userWorkerLoginEntity);
          console.log({ newCreatedUserWorkerLogin });
          res.status(201).json({ result: 'user created successufuly' });
        }
        catch(err)
        {
          console.log("================================ ERRORE  ===============================")
          console.log({err})
        }
      }
      else
      {
        if(userWorkerLoginData.is_active == 1)
        {
          console.log("USER WORKER ESISTE, ESISTE L'ENTITA LOGIN ATTIVA")
          res.status(409).json({ result: 'email already in use for another user' });
        }
        else
        {
          console.log("USER WORKER ESISTE, ESISTE ENTITA LOGIN NON ATTIVA")
          try
          {
            const newCreatedUserWorkerLogin = await this.userWorkerLoginService.createUserWorker(
              userWorkerEntity,
            );
            console.log({ newCreatedUserWorkerLogin });
            res.status(201).json({ result: 'user created successufuly' });
          }
          catch(err)
          {
            console.log("================================ ERRORE  ===============================")
            console.log(err)
            if(err = "ER_DUP_ENTRY")
            {
              console.log("ciao")
              try
              {
                await this.userWorkerLoginService.updateUserStatus(userWorkerLoginEntity.email)
                res.status(201).json({ result: 'user created successufuly' });
              }
              catch(err)
              {
                res.status(500).json({ result: 'internal server error' });
              }
            }
            else
            {
              res.status(500).json({ result: 'internal server error' });
            }
          }
        }
      }  
    }
    else
    {
      //NON ESISTE ENTITA USER WORKER
      let userWorkerLoginData = await this.userWorkerLoginService.verifyUserWorker(userWorkerLoginEntity)
      if(userWorkerLoginData == null)
      {
        console.log("USER WORKER NON ESISTE, NON ESISTE L'ENTITA LOGIN")
        //NON ESISTE ENITITA USER LOGIN
        let newCreateduserWorker = await this.userWorkerService.createUserWorker(userWorkerEntity);
        console.log({ newCreateduserWorker });
        userWorkerLoginEntity.id_user_worker = newCreateduserWorker.id_user_worker;
        console.log({userWorkerLoginEntity})
        try
        {
          const newCreatedUserWorkerLogin = await this.userWorkerLoginService.createUserWorker(
            userWorkerLoginEntity,
          );
          console.log({ newCreatedUserWorkerLogin });
          res.status(201).json({ result: 'user created successufuly' });
        }
        catch(err)
        {
          console.log("================================ ERRORE  ===============================")
          console.log({err})
        }
      }
      else
      {
        console.log("USER WORKER NON ESISTE, ESISTE L'ENTITA LOGIN ")
        res.status(409).json({ result: 'email already in use for another user' });
      }
    }
  }

}

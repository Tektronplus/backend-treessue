import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from "../auth/auth.service"
import { UserCustomerService } from '../user-customer/user-customer.service';
import { UserWorkerService } from '../user_worker/user_worker.service';
import moment from "moment"
import bcrypt from 'bcrypt';

@UseGuards(ApiKeyAuthGuard)
@Controller('user-login')
export class UserLoginController {
  constructor(private readonly userLoginService: UserLoginService, private authService:AuthService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Login!';
  }

  @Get('/all')
  async getListUsers(): Promise<Array<any>> {
    return this.userLoginService.findAll();
  }

  @Post("/login")
  async login(@Req() req)
  {
    type User = {
      username?: string,
      role?:string,
    }

    try{
      const user:User = await this.userLoginService.findUser(req.body.username,req.body.password)
      console.log({user})
      return this.authService.generateUserToken(user)
    }
    catch(err)
    {
      console.log({err})
      return {error:err.message}
    } 
  }
}

@UseGuards(ApiKeyAuthGuard)
@Controller('user-registration')
export class UserRegisterController {
  constructor(
    private readonly userCustomerService: UserCustomerService, 
    private userWorker:UserWorkerService,
    private userLoginService: UserLoginService
    ) {}

  @Post("/registerCustomer")
  async registerUser(@Req() req)
  {
    let newUser = req.body
    console.log({newUser})
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(newUser.password, salt);
    let userLoginEntity = {
      userCustomer: "",
      username:newUser.username,
      password:hash,
      role:"user"
    }
    let userCustomerEntity = {
      first_name:newUser.firstName,
      last_name:newUser.lastName,
      birth_date:moment(newUser.birthDate,"DD-MM-YYYY").toDate(),
      phone_number:newUser.phoneNumber,
      email:newUser.email,
      country:newUser.country,
      province:newUser.province,
      city:newUser.city,
      zip_code:newUser.zipCode,
      address:newUser.address
    }

    try{
      let newCreatedUserCustomer = await  this.userCustomerService.createUser(userCustomerEntity)
      console.log({newCreatedUserCustomer})
      userLoginEntity.userCustomer = newCreatedUserCustomer.id_user_customer
      console.log({userLoginEntity})
      let newCreatedUserLogin = await this.userLoginService.createUser(userLoginEntity)
      console.log({newCreatedUserLogin})
      return "utente creato con successo"
      
    }catch(err)
    {
      console.log(err)
      return {error:err.message}
    }
    //console.log({userLoginEntity},{userCustomerEntity})
  }

}

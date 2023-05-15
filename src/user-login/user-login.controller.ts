import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserCustomerService } from 'src/user-customer/user-customer.service';
import { UserWorkerService } from 'src/user_worker/user_worker.service';
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
  constructor(private readonly userCustomerService: UserCustomerService, private userWorker:UserWorkerService) {}

  @Post("/registerCustomer")
  registerUser(@Req() req)
  {
    let newUser = req.body
    console.log({newUser})

    let userLoginEntity = {
      username:newUser.username,
      password:newUser.password,
      role:"user"
    }
    
    let userCustomerEntity = {
      first_name:newUser.firstName,
      last_name:newUser.lastName,
      birth_date:new Date(newUser.birthDate),
      phone_number:newUser.phoneNumber,
      email:newUser.email,
      country:newUser.country,
      province:newUser.province,
      city:newUser.city,
      zip_code:newUser.zipCode,
      address:newUser.address
    }

    try{
      this.userCustomerService.createUser(userCustomerEntity)
    }catch(err)
    {
      console.log(err)
    }
    //console.log({userLoginEntity},{userCustomerEntity})
  }

}

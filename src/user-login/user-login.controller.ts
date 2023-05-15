import { Controller, Get, UseGuards, Post, Req } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { type } from 'os';
@UseGuards(ApiKeyAuthGuard)
@Controller('user-login')
export class UserLoginController {
  constructor(private readonly userLoginService: UserLoginService, private authService:AuthService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Login!';
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

  @Get('/all')
  async getListUsers(): Promise<Array<any>> {
    return this.userLoginService.findAll();
  }
}

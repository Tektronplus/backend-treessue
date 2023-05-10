import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('user-login')
export class UserLoginController {
  constructor(private readonly userLoginService: UserLoginService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Login!';
  }

  @Get('/all')
  async getListUsers(): Promise<Array<any>> {
    return this.userLoginService.findAll();
  }
}

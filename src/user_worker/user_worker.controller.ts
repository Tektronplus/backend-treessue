import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserLoginService } from './user_worker.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('order')
export class UserWorkerController {
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

import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserWorkerLoginService } from './user-worker-login.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('user-worker-login')
export class UserWorkerLoginController {
  constructor(
    private readonly userWorkerLoginService: UserWorkerLoginService,
  ) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Worker!';
  }

  @Get('/all')
  async getListUserWorkerLogin(): Promise<Array<any>> {
    return this.userWorkerLoginService.findAll();
  }
}

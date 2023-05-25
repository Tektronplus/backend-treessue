import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserWorkerRoleService } from './user-worker-role.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('user-worker-role')
export class UserWorkerRoleController {
  constructor(private readonly userWorkerRoleService: UserWorkerRoleService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Worker Role!';
  }

  @Get('/all')
  async getListUserWorkerRole(): Promise<Array<any>> {
    return this.userWorkerRoleService.findAll();
  }
}

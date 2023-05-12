import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserWorkerService } from './user_worker.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('userWorker')
export class UserWorkerController {
  constructor(private readonly userWorkerService: UserWorkerService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from User Login!';
  }

  @Get('/all')
  async getListUsers(): Promise<Array<any>> {
    return this.userWorkerService.findAll();
  }
}

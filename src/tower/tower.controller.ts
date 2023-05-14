import { Controller, Get, UseGuards } from '@nestjs/common';
import { TowerService } from './tower.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('tower')
export class TowerController {
  constructor(private readonly towerService: TowerService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Tower!';
  }

  @Get('/all')
  async getListTower(): Promise<Array<any>> {
    return this.towerService.findAll();
  }
}

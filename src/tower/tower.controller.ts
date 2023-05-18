import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
    return this.towerService.findAllTowers();
  }

  @Get('/all/public')
  async getListPublicTower(): Promise<Array<any>> {
    return this.towerService.findAllTowersByType(true); // public tower = true
  }

  @Get('/all/private')
  async getListPrivateTower(): Promise<Array<any>> {
    return this.towerService.findAllTowersByType(false); // private tower = false
  }

  @Post('/add')
  async addTower(@Body() body): Promise<any> {
    return this.towerService.addTower(body);
  }
}

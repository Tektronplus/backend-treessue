import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TowerService } from './tower.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('tower')
export class TowerController {
  constructor(private readonly towerService: TowerService) {}

  //--- CREATE ---
  @Post('/create')
  async addTower(@Headers() headers, @Body() body): Promise<any> {
    return this.towerService.createNewTower(headers, body);
  }

  //--- READ ---
  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Tower!';
  }

  @Get('/all')
  async getListTower(@Headers() headers): Promise<Array<any>> {
    return this.towerService.findAllTowers(headers);
  }

  @Get('/all/public')
  async getListPublicTower(@Headers() headers): Promise<Array<any>> {
    return this.towerService.findAllTowersByType(true, headers); // public tower = true
  }

  @Get('/all/private')
  async getListPrivateTower(@Headers() headers): Promise<Array<any>> {
    return this.towerService.findAllTowersByType(false, headers); // private tower = false
  }

  //--- UPDATE ---
  @Put('/update/:idTower')
  async updateProductCategoryById(
    @Param() param,
    @Headers() headers,
    @Body() body,
  ): Promise<any> {
    return this.towerService.updateTowerById(param.idTower, headers, body);
  }

  //--- DELETE ---
  @Delete('/delete/:idTower')
  async deleteProductById(@Param() param, @Headers() headers): Promise<any> {
    return this.towerService.deleteTowerById(param.idTower, headers);
  }
}

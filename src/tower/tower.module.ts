import { Module } from '@nestjs/common';
import { TowerController } from './tower.controller';
import { TowerService } from './tower.service';
import { towerProvider } from './tower.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TowerController],
  providers: [TowerService, ...towerProvider],
})
export class TowerModule {}

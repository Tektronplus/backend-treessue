import { Module } from '@nestjs/common';
import { TowerController } from './tower.controller';
import { TowerService } from './tower.service';
import { towerProvider } from './tower.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TowerController],
  providers: [TowerService, ...towerProvider],
})
export class TowerModule {}

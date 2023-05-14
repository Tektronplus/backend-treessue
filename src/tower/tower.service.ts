import { Injectable, Inject } from '@nestjs/common';
import { Tower } from './tower.entity';

@Injectable()
export class TowerService {
  constructor(
    @Inject('TOWER_REPOSITORY') private towerRepository: typeof Tower,
  ) {}

  async findAll(): Promise<Tower[]> {
    return this.towerRepository.findAll();
  }
}

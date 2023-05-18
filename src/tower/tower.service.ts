import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Tower } from './tower.entity';

@Injectable()
export class TowerService {
  constructor(
    @Inject('TOWER_REPOSITORY') private towerRepository: typeof Tower,
  ) {}

  customMethods = new CustomMethods();
  customExceptions = new CustomException();

  async findAllTowers(): Promise<Tower[]> {
    return this.towerRepository.findAll();
  }

  async findAllTowersByType(towerType): Promise<Tower[]> {
    return this.towerRepository.findAll({ where: { is_public: towerType } });
  }

  async addTower(tower) {
    const newTowerEntity = {
      id_user_customer: tower.idUserCustomer,
      is_public: tower.isPublic,
      tissue_quantity: this.customMethods.randomIntFromInterval(10, 100),
      title: tower.title,
      description: tower.description,
      address: tower.address,
      latitude: tower.latitude,
      longitude: tower.longitudine,
    };

    this.customExceptions.checkTower(newTowerEntity);
    console.log(newTowerEntity);

    return this.towerRepository.create(newTowerEntity);
  }
}

class CustomMethods {
  randomIntFromInterval(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

class CustomException {
  checkTower(newTowerEntity) {
    if (
      newTowerEntity.is_public == true &&
      (newTowerEntity.latitude == undefined ||
        newTowerEntity.longitude == undefined)
    ) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: "Public tower doesn't have latitude and/or longitude",
      });
    }

    if (
      newTowerEntity.is_public == false &&
      (newTowerEntity.latitude != undefined ||
        newTowerEntity.longitude != undefined)
    ) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: "Private tower musn't have latitude and/or longitude",
      });
    }
  }
}

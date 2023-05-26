import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Tower } from './tower.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TowerService {
  constructor(
    @Inject('TOWER_REPOSITORY') private towerRepository: typeof Tower,
    private authService: AuthService,
  ) {}

  //Custom classes
  customMethods = new CustomMethods();
  customExceptions = new CustomException(this.authService);

  async findAllTowers(headers): Promise<Tower[]> {
    //Check authentication
    const userInfo = await this.customExceptions.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customExceptions.checkAuthorization(userInfo.role, [
      'admin',
      'torrista',
    ]);
    return this.towerRepository.findAll();
  }

  async findAllTowersByType(is_public, headers): Promise<Tower[]> {
    if (!is_public) {
      //Check authentication
      const userInfo = await this.customExceptions.checkAuthentication(headers);
      console.log(userInfo);

      //Check authorization
      this.customExceptions.checkAuthorization(userInfo.role, [
        'admin',
        'torrista',
      ]);
    }
    return this.towerRepository.findAll({ where: { is_public: is_public } });
  }

  async createNewTower(headers, body) {
    //Check authentication
    const userInfo = await this.customExceptions.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customExceptions.checkAuthorization(userInfo.role, [
      'admin',
      'torrista',
    ]);

    const newTowerEntity = {
      id_user_customer: body.id_user_customer,
      is_public: body.is_public,
      tissue_quantity: this.customMethods.randomIntFromInterval(10, 100),
      title: body.title,
      description: body.description,
      address: body.address,
      latitude: body.latitude,
      longitude: body.longitude,
    };

    this.customExceptions.checkTower(newTowerEntity);

    return this.towerRepository.create(newTowerEntity);
  }

  async updateTowerById(id_tower, headers, body): Promise<any> {
    //Check authentication
    const userInfo = await this.customExceptions.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customExceptions.checkAuthorization(userInfo.role, [
      'admin',
      'torrista',
    ]);

    //Check if id exists
    await this.customExceptions.checkFindById(id_tower, this.towerRepository);

    //Check the location of tower based on the type
    const towerLocation = {
      is_public: body.is_public,
      latitude: body.latitude,
      longitude: body.longitude,
    };
    this.customExceptions.checkTower(towerLocation);

    return this.towerRepository.update(
      {
        id_user_customer: body.id_user_customer,
        is_public: body.is_public,
        title: body.title,
        description: body.description,
        address: body.address,
        latitude: body.latitude,
        longitude: body.longitude,
      },
      { where: { id_tower: id_tower } },
    );
  }

  async deleteTowerById(id_tower, headers): Promise<any> {
    //Check authentication
    const userInfo = await this.customExceptions.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customExceptions.checkAuthorization(userInfo.role, [
      'admin',
      'torrista',
    ]);

    //Check if id is valid
    await this.customExceptions.checkFindById(id_tower, this.towerRepository);

    return this.towerRepository.destroy({
      where: { id_tower: id_tower },
    });
  }
}

class CustomMethods {
  randomIntFromInterval(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

class CustomException {
  constructor(private authService: AuthService) {}
  checkTower(newTowerEntity) {
    if (
      newTowerEntity.is_public == true &&
      (!newTowerEntity.latitude || !newTowerEntity.longitude)
    ) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: "Public tower doesn't have latitude and/or longitude",
      });
    }

    if (
      newTowerEntity.is_public == false &&
      (newTowerEntity.latitude || newTowerEntity.longitude)
    ) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: "Private tower musn't have latitude and/or longitude",
      });
    }
  }

  async checkFindById(id, repository) {
    const arrayIds = await repository
      .findAll({ attributes: ['id_tower'] })
      .then((res) => res.flatMap((prod) => prod.id_tower));

    if (!arrayIds.includes(Number(id))) {
      throw new NotFoundException('Something bad happened', {
        cause: new Error(),
        description: "This id_tower doesn't exist in the DB.",
      });
    }
  }

  checkAuthorization(user_role, permitted_roles) {
    if (!permitted_roles.includes(user_role)) {
      throw new UnauthorizedException('Something bad happened', {
        cause: new Error(),
        description: 'This user is not authorized to perform this operation',
      });
    }
  }

  async checkAuthentication(headers) {
    type decodedToken = {
      userDetail?: any;
      exp?: number;
      iat?: number;
    };

    if (!headers.authorization) {
      throw new UnauthorizedException('Unauthorized request', {
        cause: new Error(),
        description: 'Token is not empty or undefied ',
      });
    }

    const authorizationToken = headers.authorization.split('Bearer ')[1];

    const isTokenValid = await this.authService.validateToken(
      authorizationToken,
    );
    if (isTokenValid) {
      const decodedInfo: decodedToken =
        await this.authService.dechiperUserToken(authorizationToken);

      const userInfo = decodedInfo.userDetail;
      return userInfo;
    } else {
      throw new UnauthorizedException('Unauthorized request', {
        cause: new Error(),
        description: 'Token is not valid',
      });
    }
  }
  ƒ;
}

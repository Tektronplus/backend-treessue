import {
  Injectable,
  Inject,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrderStatus } from './order-status.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class OrderStatusService {
  constructor(
    @Inject('ORDER_STATUS_REPOSITORY')
    private orderStatusRepository: typeof OrderStatus,
    private authService: AuthService,
  ) {}

  // Custom classes
  customException = new CustomException(this.authService);

  async getHello(): Promise<any> {
    return 'Hello from Order Status';
  }

  async findAll(headers): Promise<any> {
    //Check authentication
    const userInfo = await this.customException.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customException.checkAuthorization(userInfo.role, [
      'admin',
      'ufficio',
    ]);
    return this.orderStatusRepository.findAll();
  }

  async createNewOrderStatus(headers, body): Promise<any> {
    //Check authentication
    const userInfo = await this.customException.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customException.checkAuthorization(userInfo.role, [
      'admin',
      'ufficio',
      'magazzino'
    ]);

    const newOrderStatus = {
      status: body.status,
    };

    return this.orderStatusRepository.create(newOrderStatus);
  }

  async updateOrderStatusById(id_order_status, headers, body): Promise<any> {
    //Check authentication
    const userInfo = await this.customException.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customException.checkAuthorization(userInfo.role, [
      'admin',
      'ufficio',
    ]);

    await this.customException.checkFindById(
      id_order_status,
      this.orderStatusRepository,
    );

    return this.orderStatusRepository
      .update(
        {
          status: body.status,
        },
        { where: { id_order_status: id_order_status } },
      )
      .then((res) => {
        if (res[0] == 1) {
          return { result: 'Query executed successfully' };
        } else {
          throw new BadRequestException('Something bad happened', {
            cause: new Error(),
            description:
              'Query error, please check your data. Probably, there is no difference between your data and the data that already exists.',
          });
        }
      });
  }

  async deleteOrderStatusyById(id_order_status, headers): Promise<any> {
    //Check authentication
    const userInfo = await this.customException.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customException.checkAuthorization(userInfo.role, [
      'admin',
      'ufficio',
    ]);

    //Check if id is valid
    await this.customException.checkFindById(
      id_order_status,
      this.orderStatusRepository,
    );

    return this.orderStatusRepository
      .destroy({
        where: { id_order_status: id_order_status },
      })
      .then((res) => {
        if (res == 1) {
          return { result: 'Query executed successfully' };
        } else {
          throw new BadRequestException('Something bad happened', {
            cause: new Error(),
            description: 'Query error, please check your data.',
          });
        }
      });
  }

  async findStatusId(status): Promise<any> {
    console.log({ status });
    try {
      const foundStatus = await this.orderStatusRepository.findOne({
        where: { status: status },
      });
      console.log({ foundStatus });
      if (foundStatus == null) {
        return undefined;
      } else {
        return foundStatus;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async findStatusById(id): Promise<any> {
    try {
      return await this.orderStatusRepository.findOne({
        where: { id_order_status: id },
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
class CustomException {
  constructor(private authService: AuthService) {}
  async checkFindById(id, repository) {
    const arrayIds = await repository
      .findAll({ attributes: ['id_order_status'] })
      .then((res) => res.flatMap((prod) => prod['id_order_status']));

    if (!arrayIds.includes(Number(id))) {
      throw new NotFoundException('Something bad happened', {
        cause: new Error(),
        description: "This id_order_status doesn't exist in the DB.",
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
}

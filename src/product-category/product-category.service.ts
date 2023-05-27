import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ProductCategory } from './product-category.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject('PRODUCT_CATEGORY_REPOSITORY')
    private productCategoryRepository: typeof ProductCategory,
    private authService: AuthService,
  ) {}

  //Custom classes
  customMethods = new CustomMethods(this.authService);
  customException = new CustomException();

  async findAll(headers): Promise<ProductCategory[]> {
    //Check authentication
    const userInfo = await this.customMethods.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customException.checkAuthorization(userInfo.role, [
      'admin',
      'ufficio',
    ]);
    return this.productCategoryRepository.findAll();
  }

  async createNewProductCategory(headers, body): Promise<any> {
    //Check authentication
    const userInfo = await this.customMethods.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customException.checkAuthorization(userInfo.role, [
      'admin',
      'ufficio',
    ]);

    const newProductCategory = {
      category: body.category,
    };

    return this.productCategoryRepository.create(newProductCategory);
  }

  async updateProductCategoryById(
    id_product_category,
    headers,
    body,
  ): Promise<any> {
    //Check authentication
    const userInfo = await this.customMethods.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customException.checkAuthorization(userInfo.role, [
      'admin',
      'ufficio',
    ]);

    await this.customException.checkFindById(
      id_product_category,
      this.productCategoryRepository,
    );

    return this.productCategoryRepository
      .update(
        {
          category: body.category,
        },
        { where: { id_product_category: id_product_category } },
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

  async deleteProductCategoryById(id_product_category, headers): Promise<any> {
    //Check authentication
    const userInfo = await this.customMethods.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customException.checkAuthorization(userInfo.role, [
      'admin',
      'ufficio',
    ]);

    //Check if id is valid
    await this.customException.checkFindById(
      id_product_category,
      this.productCategoryRepository,
    );

    return this.productCategoryRepository
      .destroy({
        where: { id_product_category: id_product_category },
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
}

class CustomException {
  async checkFindById(id, repository) {
    const arrayIds = await repository
      .findAll({ attributes: ['id_product_category'] })
      .then((res) => res.flatMap((prod) => prod.id_product_category));

    if (!arrayIds.includes(Number(id))) {
      throw new NotFoundException('Something bad happened', {
        cause: new Error(),
        description: "This id_product_category doesn't exist in the DB.",
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
}

class CustomMethods {
  constructor(private authService: AuthService) {}

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

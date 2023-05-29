import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductCategory } from '../product-category/product-category.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY') private productRepository: typeof Product,
    private authService: AuthService,
  ) {}

  //Custom classes
  customMethods = new CustomMethods(this.authService);
  customException = new CustomException();

  async findAll(): Promise<any[]> {
    const arrayProducts = await this.productRepository.findAll({
      include: ProductCategory,
    });
    return arrayProducts.map((product) => {
      return {
        id_product: product.id_product,
        prod_name: product.prod_name,
        category: product.product_category.category,
        description: product.description,
        unit_price: product.unit_price,
        image: product.image,
        is_available: product.is_available,
        available_quantity: product.available_quantity,
      };
    });
  }

  async findById(id_product): Promise<Product> {
    await this.customException.checkFindById(
      id_product,
      this.productRepository,
    );
    return this.productRepository.findByPk(id_product);
  }

  async createNewProduct(headers, body): Promise<any> {
    //Check authentication
    const userInfo = await this.customMethods.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customException.checkAuthorization(userInfo.role, [
      'admin',
      'ufficio',
    ]);

    const newProduct = {
      prod_name: body.prod_name,
      id_product_category: body.id_product_category,
      description: body.description,
      image: body.image,
      unit_price: body.unit_price,
      is_available: body.is_available,
      available_quantity: body.available_quantity,
    };

    return this.productRepository.create(newProduct);
  }

  async updateProductById(id_product, headers, body): Promise<any> {
    //Check authentication
    const userInfo = await this.customMethods.checkAuthentication(headers);
    console.log(userInfo);

    //Check authorization
    this.customException.checkAuthorization(userInfo.role, [
      'admin',
      'ufficio',
    ]);

    await this.customException.checkFindById(
      id_product,
      this.productRepository,
    );

    return this.productRepository
      .update(
        {
          prod_name: body.prod_name,
          id_product_category: body.id_product_category,
          description: body.description,
          image: body.image,
          unit_price: body.unit_price,
          is_available: body.is_available,
          available_quantity: body.available_quantity,
        },
        { where: { id_product: id_product } },
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

  async deleteProductById(id_product, headers): Promise<any> {
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
      id_product,
      this.productRepository,
    );

    return this.productRepository
      .destroy({
        where: { id_product: id_product },
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

  async updateQuantityProduct(id_product, new_quantity): Promise<any> {
    return this.productRepository.update(
      { available_quantity: new_quantity },
      { where: { id_product: id_product } },
    );
  }
}

class CustomException {
  async checkFindById(id_product, productRepository) {
    const arrayIdProducts = await productRepository
      .findAll({ attributes: ['id_product'] })
      .then((res) => res.flatMap((prod) => prod['id_product']));

    if (!arrayIdProducts.includes(Number(id_product))) {
      throw new NotFoundException('Something bad happened', {
        cause: new Error(),
        description: "This id_product doesn't exist in the DB.",
      });
    }
  }

  checkAuthorization(user_role, permitted_roles) {
    if (permitted_roles.includes(user_role)) {
      return true;
    } else {
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

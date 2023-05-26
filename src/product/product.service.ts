import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
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
    console.log(headers);
    //const userInfo = await this.customMethods.checkAuthentication(headers);
    //console.log(userInfo);

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
    console.log(headers);
    //const userInfo = await this.customMethods.checkAuthentication(headers);
    //console.log(userInfo);

    await this.customException.checkFindById(
      id_product,
      this.productRepository,
    );

    return this.productRepository.update(
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
    );
  }

  async deleteProductById(id_product): Promise<any> {
    await this.customException.checkFindById(
      id_product,
      this.productRepository,
    );

    return this.productRepository.destroy({
      where: { id_product: id_product },
    });
  }
}

class CustomException {
  async checkFindById(id_product, productRepository) {
    const arrayIdProducts = await productRepository
      .findAll({ attributes: ['id_product'] })
      .then((res) => res.flatMap((prod) => prod.id_product));

    if (!arrayIdProducts.includes(Number(id_product))) {
      throw new NotFoundException('Something bad happened', {
        cause: new Error(),
        description: "This id_product doesn't exist in the DB.",
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

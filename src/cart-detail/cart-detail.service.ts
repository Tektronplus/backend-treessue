import {
  Injectable,
  Inject,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CartDetail } from './cart-detail.entity';
import { AuthService } from '../auth/auth.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartDetailService {
  constructor(
    @Inject('CART_DETAIL_REPOSITORY')
    private cartDetailRepository: typeof CartDetail,
    private authService: AuthService,
    private productService: ProductService,
  ) {}

  //Custom classes
  customMethods = new CustomMethods(this.authService);
  customExceptions = new CustomExceptions();

  async findAll(): Promise<CartDetail[]> {
    return this.cartDetailRepository.findAll();
  }

  async findCartDetailByUserCustomer(headers): Promise<Array<any>> {
    const userInfo = await this.customMethods.checkAuthentication(headers);

    const customerCart = await this.cartDetailRepository.findAll({
      where: { id_user_customer: userInfo.id },
    });
    return customerCart.map((cartItem) => {
      return {
        idCartDetail: cartItem.id_cart_detail,
        idProduct: cartItem.id_product,
        quantity: cartItem.quantity,
      };
    });
  }

  async addItemToCart(headers, idProduct, quantity) {
    const userInfo = await this.customMethods.checkAuthentication(headers);

    const customerCart = await this.cartDetailRepository.findAll({
      where: { id_user_customer: userInfo.id },
    });

    //Check if the product already exists in the cart
    const existingProductCart = customerCart.find(
      (product) => product.id_product == idProduct,
    );

    if (existingProductCart) {
      return this.cartDetailRepository.update(
        { quantity: existingProductCart.quantity + quantity },
        { where: { id_cart_detail: existingProductCart.id_cart_detail } },
      );
    } else {
      const newCartItem = {
        id_user_customer: userInfo.id,
        id_product: idProduct,
        quantity: quantity,
      };
      return this.cartDetailRepository.create(newCartItem);
    }
  }

  async addOfflineItemsToCart(headers, body): Promise<any> {
    const arrayIdProduct = await this.productService.getAllProductsIds();
    const cart = body.cart;
    console.log(arrayIdProduct);
    console.log(cart);
    if (Array.isArray(cart)) {
      for (const item of cart) {
        if (!arrayIdProduct.includes(item.id_product)) {
          throw new NotFoundException('Not found exception', {
            cause: new Error(),
            description: `The ID= ${item.id_product} is not assigned to any product `,
          });
        }
      }
      for (const item of cart) {
        await this.addItemToCart(headers, item.id_product, item.quantity);
      }
      const cartCustomer = await this.findCartDetailByUserCustomer(headers);
      return { cartCustomer };
    }
    return { result: 'There is not any product to add' };
  }

  async deleteCartDetailItemById(headers, id_cart_detail): Promise<any> {
    const userInfo = await this.customMethods.checkAuthentication(headers);
    const customerCart = await this.cartDetailRepository.findAll({
      where: { id_user_customer: userInfo.id },
    });

    this.customExceptions.checkCustomerHasItem(customerCart, id_cart_detail);

    return this.cartDetailRepository
      .destroy({
        where: { id_cart_detail: id_cart_detail },
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

  async changeQuantityById(headers, body): Promise<any> {
    const userInfo = await this.customMethods.checkAuthentication(headers);
    const customerCart = await this.cartDetailRepository.findAll({
      where: { id_user_customer: userInfo.id },
    });

    this.customExceptions.checkCustomerHasItem(customerCart, body.idCartDetail);

    return this.cartDetailRepository
      .update(
        { quantity: body.newQuantity },
        { where: { id_cart_detail: body.idCartDetail } },
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

  async deleteCartByIdUserCustomer(id) {
    await this.cartDetailRepository.destroy({
      where: { id_user_customer: id },
    });
    return;
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

class CustomExceptions {
  checkCustomerHasItem(customerCart, idCartDetail) {
    const arrayOfCartDetailId = customerCart.flatMap(
      (item) => item.dataValues.id_cart_detail,
    );

    if (arrayOfCartDetailId.includes(Number(idCartDetail))) {
      return true;
    } else {
      throw new ForbiddenException('Unauthorized request', {
        cause: new Error(),
        description:
          'The user cannot delete/update this item, because it does not exist or because it is not in his cart',
      });
    }
  }
}

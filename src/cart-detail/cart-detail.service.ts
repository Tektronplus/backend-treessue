import {
  Injectable,
  Inject,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { CartDetail } from './cart-detail.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CartDetailService {
  constructor(
    @Inject('CART_DETAIL_REPOSITORY')
    private cartDetailRepository: typeof CartDetail,
    private authService: AuthService,
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

  async deleteCartDetailItemById(headers, body): Promise<any> {
    const userInfo = await this.customMethods.checkAuthentication(headers);
    const customerCart = await this.cartDetailRepository.findAll({
      where: { id_user_customer: userInfo.id },
    });

    this.customExceptions.checkDeleteCartDetailItemById(
      customerCart,
      body.idCartDetail,
    );

    if (userInfo) {
      return this.cartDetailRepository.destroy({
        where: { id_cart_detail: body.idCartDetail },
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

class CustomExceptions {
  checkDeleteCartDetailItemById(customerCart, idCartDetailToDelete) {
    const arrayOfCartDetailId = customerCart.flatMap(
      (item) => item.dataValues.id_cart_detail,
    );

    if (arrayOfCartDetailId.includes(idCartDetailToDelete)) {
      return true;
    } else {
      throw new ForbiddenException('Unauthorized request', {
        cause: new Error(),
        description:
          'The user cannot delete this item, because it does not exist or because it is not in his cart',
      });
    }
  }
}

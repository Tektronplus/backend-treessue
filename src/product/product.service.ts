import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY') private productRepository: typeof Product,
  ) {}

  customException = new CustomException();

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findById(id_product): Promise<Product> {
    const arrayIdProdcuts = await this.productRepository
      .findAll({
        attributes: ['id_product'],
      })
      .then((res) => res.map((prod) => prod.dataValues.id_product));

    this.customException.checkFindById(id_product, arrayIdProdcuts);
    return this.productRepository.findByPk(id_product);
  }
}

class CustomException {
  checkFindById(id_product, arrayIdProducts) {
    if (!arrayIdProducts.includes(Number(id_product))) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: "This id_product doesn't exist in the DB.",
      });
    }
  }
}

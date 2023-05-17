import { Injectable, Inject } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY') private productRepository: typeof Product,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findById(id_product): Promise<Product> {
    return this.productRepository.findByPk(id_product);
  }
}

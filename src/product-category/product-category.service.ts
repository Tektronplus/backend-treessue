import { Injectable, Inject } from '@nestjs/common';
import { ProductCategory } from './product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject('PRODUCT_CATEGORY_REPOSITORY')
    private productCategoryRepository: typeof ProductCategory,
  ) {}

  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.findAll();
  }
}

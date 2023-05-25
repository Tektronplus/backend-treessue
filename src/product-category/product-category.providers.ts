import { ProductCategory } from './product-category.entity';

export const productCategoryProvider = [
  {
    provide: 'PRODUCT_CATEGORY_REPOSITORY',
    useValue: ProductCategory,
  },
];

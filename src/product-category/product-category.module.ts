import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';
import { productCategoryProvider } from './product-category.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, ...productCategoryProvider],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}

import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProvider } from './product.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService, ...productProvider],
  exports:[ProductService]
})
export class ProductModule {}

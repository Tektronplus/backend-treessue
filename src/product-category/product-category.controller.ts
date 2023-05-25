import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Product Category!';
  }

  @Get('/all')
  async getListProductCategory(): Promise<Array<any>> {
    return this.productCategoryService.findAll();
  }
}

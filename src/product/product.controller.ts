import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { Product } from './product.entity';

@UseGuards(ApiKeyAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getHelloProduct(): Promise<string> {
    return 'Hello from Products!';
  }

  @Get('/all')
  async getListProducts(): Promise<Array<any>> {
    return this.productService.findAll();
  }

  @Get('/id/:idProduct')
  async getProductById(@Param() param): Promise<Product> {
    return this.productService.findById(param.idProduct);
  }
}

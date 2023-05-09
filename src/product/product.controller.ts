import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
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
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
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

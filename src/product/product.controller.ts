import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { Product } from './product.entity';

@UseGuards(ApiKeyAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //--- CREATE ---
  @Post('/create')
  async createProduct(@Headers() headers, @Body() body): Promise<any> {
    return this.productService.createNewProduct(headers, body);
  }

  //--- READ ---
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

  //--- UPDATE ---
  @Put('/update/:idProduct')
  async updateProductById(
    @Param() param,
    @Headers() headers,
    @Body() body,
  ): Promise<any> {
    return this.productService.updateProductById(
      param.idProduct,
      headers,
      body,
    );
  }

  //--- DELETE ---
  @Delete('/delete/:idProduct')
  async deleteProductById(@Param() param, @Headers() headers): Promise<any> {
    return this.productService.deleteProductById(param.idProduct, headers);
  }
}

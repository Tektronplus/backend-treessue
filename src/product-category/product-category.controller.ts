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
import { ProductCategoryService } from './product-category.service';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  //--- CREATE ---
  @Post('/create')
  async createProductCategory(@Headers() headers, @Body() body): Promise<any> {
    return this.productCategoryService.createNewProductCategory(headers, body);
  }

  //--- READ ---
  @Get('/')
  async getHello(): Promise<string> {
    return 'Hello from Product Category!';
  }

  @Get('/all')
  async getListProductCategory(@Headers() headers): Promise<Array<any>> {
    return this.productCategoryService.findAll(headers);
  }

  //--- UPDATE ---
  @Put('/update/:idProductCategory')
  async updateProductCategoryById(
    @Param() param,
    @Headers() headers,
    @Body() body,
  ): Promise<any> {
    return this.productCategoryService.updateProductCategoryById(
      param.idProductCategory,
      headers,
      body,
    );
  }

  //--- DELETE ---
  @Delete('/delete/:idProductCategory')
  async deleteProductById(@Param() param, @Headers() headers): Promise<any> {
    return this.productCategoryService.deleteProductCategoryById(
      param.idProductCategory,
      headers,
    );
  }
}

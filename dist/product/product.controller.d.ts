import { ProductService } from './product.service';
import { Product } from './product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getHelloProduct(): Promise<string>;
    getListProducts(): Promise<Array<any>>;
    getProductById(param: any): Promise<Product>;
}

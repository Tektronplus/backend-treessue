import { Product } from './product.entity';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: typeof Product);
    findAll(): Promise<Product[]>;
    findById(id_product: any): Promise<Product>;
}

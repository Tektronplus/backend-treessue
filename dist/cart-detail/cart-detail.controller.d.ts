import { CartDetailService } from './cart-detail.service';
export declare class CartDetailController {
    private readonly cartDetailService;
    constructor(cartDetailService: CartDetailService);
    getHello(): Promise<string>;
    getListCartDetail(): Promise<Array<any>>;
}

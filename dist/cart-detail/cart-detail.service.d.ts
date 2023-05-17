import { CartDetail } from './cart-detail.entity';
export declare class CartDetailService {
    private cartDetailRepository;
    constructor(cartDetailRepository: typeof CartDetail);
    findAll(): Promise<CartDetail[]>;
}

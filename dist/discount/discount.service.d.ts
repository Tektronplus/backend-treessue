import { Discount } from './discount.entity';
export declare class DiscountService {
    private discountRepository;
    constructor(discountRepository: typeof Discount);
    findAll(): Promise<Discount[]>;
}

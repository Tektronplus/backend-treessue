import { DiscountService } from './discount.service';
export declare class DiscountController {
    private readonly discountService;
    constructor(discountService: DiscountService);
    getHello(): Promise<string>;
    getListDiscount(): Promise<Array<any>>;
}

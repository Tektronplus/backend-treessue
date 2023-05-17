import { OrderDetailService } from './order-detail.service';
export declare class OrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    getHello(): Promise<string>;
    getListOrderDetail(): Promise<Array<any>>;
}

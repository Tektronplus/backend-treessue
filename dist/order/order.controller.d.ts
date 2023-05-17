import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getHello(): Promise<string>;
    getListOrders(): Promise<Array<any>>;
}

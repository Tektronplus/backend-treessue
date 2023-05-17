import { Order } from './order.entity';
export declare class OrderService {
    private OrderRepository;
    constructor(OrderRepository: typeof Order);
    findAll(): Promise<Order[]>;
}

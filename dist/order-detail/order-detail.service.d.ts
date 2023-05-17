import { OrderDetail } from './order-detail.entity';
export declare class OrderDetailService {
    private orderDetailRepository;
    constructor(orderDetailRepository: typeof OrderDetail);
    findAll(): Promise<OrderDetail[]>;
}

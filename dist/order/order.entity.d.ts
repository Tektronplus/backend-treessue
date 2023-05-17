import { Model } from 'sequelize-typescript';
import { UserCustomer } from '../user-customer/user-customer.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
export declare class Order extends Model {
    id_order: number;
    id_user_customer: number;
    user_customer: UserCustomer;
    id_user_worker: string;
    order_date: number;
    order_status: boolean;
    courier_name: string;
    tracking_code: string;
    start_shipping_date: number;
    expected_delivery_date: number;
    delivery_date: number;
    original_price: number;
    discount: number;
    price: number;
    orders_detail: OrderDetail[];
}

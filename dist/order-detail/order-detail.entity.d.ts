import { Model } from 'sequelize-typescript';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
export declare class OrderDetail extends Model {
    id_order_detail: number;
    id_order: number;
    order: Order;
    id_product: number;
    product: Product;
    discount: number;
    original_price: number;
    price: number;
    quantity: number;
    description: number;
}

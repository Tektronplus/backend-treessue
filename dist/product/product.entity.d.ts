import { Model } from 'sequelize-typescript';
import { CartDetail } from '../cart-detail/cart-detail.entity';
import { Discount } from '../discount/discount.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
export declare class Product extends Model {
    id_product: number;
    id_discount: number;
    discount: Discount;
    prod_name: string;
    category: string;
    description: string;
    unit_price: number;
    image: any;
    is_available: boolean;
    order_details: OrderDetail[];
    cart_details: CartDetail[];
}

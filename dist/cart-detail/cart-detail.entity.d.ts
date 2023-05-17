import { Model } from 'sequelize-typescript';
import { Product } from '../product/product.entity';
import { UserCustomer } from '../user-customer/user-customer.entity';
export declare class CartDetail extends Model {
    id_cart_detail: number;
    id_user_customer: number;
    user_customer: UserCustomer;
    id_product: number;
    product: Product;
    quantity: number;
}

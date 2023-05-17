import { Model } from 'sequelize-typescript';
import { CartDetail } from '../cart-detail/cart-detail.entity';
import { Order } from '../order/order.entity';
import { Tower } from '../tower/tower.entity';
import { UserLogin } from '../user-login/user-login.entity';
export declare class UserCustomer extends Model {
    id_user_customer: number;
    first_name: string;
    last_name: string;
    birth_date: any;
    phone_number: string;
    email: string;
    country: string;
    province: string;
    city: string;
    zip_code: string;
    address: string;
    cart_detail: CartDetail;
    user_login: UserLogin;
    orders: Order[];
    towers: Tower[];
}

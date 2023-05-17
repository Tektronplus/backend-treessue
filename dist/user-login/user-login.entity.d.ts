import { Model } from 'sequelize-typescript';
import { UserCustomer } from '../user-customer/user-customer.entity';
export declare class UserLogin extends Model {
    id_user_login: number;
    id_user_customer: number;
    user_customer: UserCustomer;
    username: string;
    password: string;
    role: string;
}

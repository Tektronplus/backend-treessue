import { Model } from 'sequelize-typescript';
import { UserCustomer } from '../user-customer/user-customer.entity';
export declare class Tower extends Model {
    id_tower: number;
    id_user_customer: number;
    user_customer: UserCustomer;
    type: string;
    tissue_quantity: number;
    tower_name: string;
    address: string;
    latitude: string;
    longitude: string;
}

import { Model } from 'sequelize-typescript';
import { Product } from '../product/product.entity';
export declare class Discount extends Model {
    id_discount: number;
    products: Product[];
    type_discount: string;
    value_discount: number;
    start_date: any;
    end_date: any;
}

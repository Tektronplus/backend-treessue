import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../product/product.entity';
import { UserCustomer } from '../user-customer/user-customer.entity';

@Table({ tableName: 'cart_detail', updatedAt: false, createdAt: false })
export class CartDetail extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id_cart_detail: number;

  @ForeignKey(() => UserCustomer)
  @Column({ allowNull: false })
  id_user_customer: number;

  @BelongsTo(() => UserCustomer)
  user_customer: UserCustomer;

  @ForeignKey(() => Product)
  @Column({ allowNull: false })
  id_product: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ allowNull: false })
  quantity: number;
}

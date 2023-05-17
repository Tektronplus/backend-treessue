import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { CartDetail } from '../cart-detail/cart-detail.entity';
import { Discount } from '../discount/discount.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';

@Table({ tableName: 'products', updatedAt: false, createdAt: false })
export class Product extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id_product: number;

  @ForeignKey(() => Discount)
  @Column({ allowNull: false })
  id_discount: number;

  @BelongsTo(() => Discount)
  discount: Discount;

  @Column
  prod_name: string;

  @Column
  category: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.FLOAT)
  unit_price: number;

  @Column(DataType.BLOB('medium'))
  image: any;

  @Column(DataType.BOOLEAN)
  is_available: boolean;

  @HasMany(() => OrderDetail)
  order_details: OrderDetail[];

  @HasMany(() => CartDetail)
  cart_details: CartDetail[];
}

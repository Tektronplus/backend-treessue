import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';

@Table({ tableName: 'order_detail', updatedAt: false, createdAt: false })
export class OrderDetail extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id_order_detail: number;

  @ForeignKey(() => Order)
  @Column({ allowNull: false })
  id_order: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Product)
  @Column({ allowNull: false })
  id_product: number;

  @BelongsTo(() => Product)
  product: Product;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ allowNull: false })
  quantity: number;

  @Column({ allowNull: false })
  description: string;
}

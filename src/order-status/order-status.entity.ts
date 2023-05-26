import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Order } from '../order/order.entity';

@Table({ tableName: 'order_status', updatedAt: false, createdAt: false })
export class OrderStatus extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id_order_status: number;

  @Column({ allowNull: false, unique: true })
  status: string;

  //Relationships
  @HasMany(() => Order)
  product: Order;
}

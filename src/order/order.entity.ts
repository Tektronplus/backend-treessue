import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { UserCustomer } from '../user-customer/user-customer.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
import { UserWorker } from '../user-worker/user-worker.entity';
import { OrderStatus } from '../order-status/order-status.entity';

@Table({ tableName: 'order', updatedAt: false, createdAt: false })
export class Order extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id_order: number;

  @ForeignKey(() => UserCustomer)
  @Column({ allowNull: false })
  id_user_customer: number;

  @BelongsTo(() => UserCustomer)
  user_customer: UserCustomer;

  @ForeignKey(() => UserWorker)
  @Column
  id_user_worker: number;

  @BelongsTo(() => UserWorker)
  user_worker: UserWorker;

  @ForeignKey(() => OrderStatus)
  @Column({ allowNull: false })
  id_order_status: number;

  @BelongsTo(() => OrderStatus)
  order_status: OrderStatus;

  @Column({ type: DataType.DATE, allowNull: false })
  order_date: number;

  @Column({ allowNull: true })
  courier_name: string;

  @Column({ allowNull: true, unique: true })
  tracking_code: string;

  @Column({ type: DataType.DATE, allowNull: true })
  start_shipping_date: number;

  @Column({ type: DataType.DATE, allowNull: false })
  expected_delivery_date: number;

  @Column({ type: DataType.DATE, allowNull: true })
  delivery_date: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  //Relationships
  @HasMany(() => OrderDetail)
  orders_detail: OrderDetail[];
}

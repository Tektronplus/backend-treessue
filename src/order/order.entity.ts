import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { UserCustomer } from '../user-customer/user-customer.entity';
import { UserWorker } from '../user_worker/user_worker.entity';

@Table({ tableName: 'user_login', updatedAt: false, createdAt: false })
export class Order extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id_order: number;

  @BelongsTo(() => UserCustomer)
  id_user_customer: number;

  @ForeignKey(() => UserWorker)
  @Column({ allowNull: false })
  user_worker_id: number;

  @Column({ type: DataType.DATE, allowNull: false })
  order_date: number;

  @Column({ allowNull: false })
  order_status: boolean;

  @Column({ allowNull: true })
  courier_name: string;

  @Column({ allowNull: true })
  tracking_code: string;

  @Column({ type: DataType.DATE, allowNull: true })
  start_shipping_date: number;

  @Column({ type: DataType.DATE, allowNull: false })
  expected_delivery_date: number;

  @Column({ type: DataType.DATE, allowNull: true })
  delivery_date: number;

  @Column({ allowNull: false })
  original_price: number;

  @Column({ allowNull: true })
  discount: number;

  @Column({ allowNull: false })
  price: number;
}

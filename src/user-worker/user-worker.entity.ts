import {
  Table,
  Column,
  Model,
  HasOne,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserWorkerLogin } from '../user-worker-login/user-worker-login.entity';
import { Order } from '../order/order.entity';
import { UserWorkerRole } from '../user-worker-role/user-worker-role.entity';

@Table({ tableName: 'user_worker', updatedAt: false, createdAt: false })
export class UserWorker extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id_user_worker: number;

  @Column({ allowNull: false })
  first_name: string;

  @Column({ allowNull: false })
  last_name: string;

  @ForeignKey(() => UserWorkerRole)
  @Column({ allowNull: false })
  id_user_worker_role: number;

  @BelongsTo(() => UserWorkerRole)
  user_worker_role: UserWorkerRole;

  //Relationships
  @HasOne(() => UserWorkerLogin)
  user_login_worker: UserWorkerLogin;

  @HasMany(() => Order)
  order: Order;
}

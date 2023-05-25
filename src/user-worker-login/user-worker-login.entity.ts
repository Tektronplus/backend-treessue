import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserWorker } from '../user-worker/user-worker.entity';

@Table({ tableName: 'user_login_worker', updatedAt: false, createdAt: false })
export class UserWorkerLogin extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id_user_login_worker: number;

  @ForeignKey(() => UserWorker)
  @Column({ allowNull: false, unique: true })
  id_user_worker: number;

  @BelongsTo(() => UserWorker)
  user_worker: UserWorker;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_active: any;
}

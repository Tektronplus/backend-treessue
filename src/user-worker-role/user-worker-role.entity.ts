import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { UserWorker } from '../user-worker/user-worker.entity';

@Table({ tableName: 'user_worker_role', updatedAt: false, createdAt: false })
export class UserWorkerRole extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id_user_worker_role: number;

  @Column({ allowNull: false, unique: true })
  role: string;

  //Relationships
  @HasMany(() => UserWorker)
  user_worker: UserWorker;
}

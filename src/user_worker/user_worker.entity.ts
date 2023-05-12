import { Table, Column, Model } from 'sequelize-typescript';


@Table({ tableName: 'user_login', updatedAt: false, createdAt: false })
export class UserWorker extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id_order: number;

  @Column({ allowNull: false })
  first_name: string;

  @Column({ allowNull: false })
  last_name: string;
}

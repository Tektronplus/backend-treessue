import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'user_login', updatedAt: false, createdAt: false })
export class UserLogin extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id_user_login: number;

  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  role: string;
}

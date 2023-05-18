import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserCustomer } from '../user-customer/user-customer.entity';

@Table({ tableName: 'user_login', updatedAt: false, createdAt: false })
export class UserLogin extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  })
  id_user_login: number;

  @ForeignKey(() => UserCustomer)
  @Column({ allowNull: false })
  id_user_customer: number;

  @BelongsTo(() => UserCustomer)
  user_customer: UserCustomer;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  role: string;
}

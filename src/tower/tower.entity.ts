import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserCustomer } from '../user-customer/user-customer.entity';

@Table({ tableName: 'tower', updatedAt: false, createdAt: false })
export class Tower extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id_tower: number;

  @ForeignKey(() => UserCustomer)
  @Column({ allowNull: false })
  id_user_customer: number;

  @BelongsTo(() => UserCustomer)
  user_customer: UserCustomer;

  @Column({ allowNull: false })
  is_public: boolean;

  @Column
  tissue_quantity: number;

  @Column({ allowNull: false })
  title: string;

  @Column
  description: string;

  @Column
  address: string;

  @Column
  latitude: string;

  @Column
  longitude: string;
}

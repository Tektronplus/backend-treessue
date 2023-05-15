import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserCustomer } from 'src/user-customer/user-customer.entity';

@Table({ tableName: 'tower', updatedAt: false, createdAt: false })
export class Tower extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id_tower: number;

  @ForeignKey(() => UserCustomer)
  @Column({ allowNull: false })
  id_user_customer: number;

  @BelongsTo(() => UserCustomer)
  user_customer: UserCustomer;

  @Column({ allowNull: false })
  type: string;

  @Column
  tissue_quantity: number;

  @Column
  tower_name: string;

  @Column
  address: string;

  @Column
  latitude: string;

  @Column
  longitude: string;
}

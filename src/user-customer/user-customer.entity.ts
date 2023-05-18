import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { CartDetail } from '../cart-detail/cart-detail.entity';
import { Order } from '../order/order.entity';
import { Tower } from '../tower/tower.entity';
import { UserLogin } from '../user-login/user-login.entity';

@Table({ tableName: 'user_customer', updatedAt: false, createdAt: false })
export class UserCustomer extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  })
  id_user_customer: number;

  @Column({ allowNull: false })
  first_name: string;

  @Column({ allowNull: false })
  last_name: string;

  @Column({ type: DataType.DATE })
  birth_date: any;

  @Column({ unique: true })
  phone_number: string;

  @Column
  country: string;

  @Column
  province: string;

  @Column
  city: string;

  @Column
  zip_code: string; //CAP

  @Column
  address: string;

  //Relationships

  @HasOne(() => CartDetail,{onDelete:'cascade'})
  cart_detail: CartDetail;

  @HasOne(() => UserLogin,{onDelete:'cascade'})
  user_login: UserLogin;

  @HasMany(() => Order,{onDelete:'cascade'})
  orders: Order[];

  @HasMany(() => Tower,{onDelete:'cascade'})
  towers: Tower[];
}

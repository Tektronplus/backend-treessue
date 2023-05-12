import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'user_customer', updatedAt: false, createdAt: false })
export class UserCustomer extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id_product: number;

  @Column({ allowNull: false })
  first_name: string; 

  @Column({ allowNull: false })
  last_name: string;

  @Column({ type: DataType.DATE, allowNull: false })
  bith_date: any;

  @Column
  phone_number: string;

  @Column({ allowNull: false })
  email: string;

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
}

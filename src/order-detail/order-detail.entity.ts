import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'order_detail', updatedAt: false, createdAt: false })
export class OrderDetail extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id_order_detail: number;

  @Column({ allowNull: false })
  discount: number;

  @Column({ allowNull: false })
  original_price: number;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false })
  quantity: number;

  @Column({ allowNull: false })
  description: number;
}

import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'cart_detail', updatedAt: false, createdAt: false })
export class CartDetail extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id_cart_detail: number;

  @Column({ allowNull: false })
  quantity: number;
}

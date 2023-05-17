import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../product/product.entity';

@Table({ tableName: 'discount', updatedAt: false, createdAt: false })
export class Discount extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id_discount: number;

  @HasMany(() => Product)
  products: Product[];

  @Column({ allowNull: false })
  type_discount: string;

  @Column({ allowNull: false })
  value_discount: number;

  @Column({ type: DataType.DATE, allowNull: false })
  start_date: any;

  @Column({ type: DataType.DATE, allowNull: false })
  end_date: any;
}

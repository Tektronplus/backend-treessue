import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'products', updatedAt: false, createdAt: false })
export class Product extends Model {
  @Column({ primaryKey: true })
  id_product: number;

  @Column
  prod_name: string;

  @Column
  category: string;

  @Column(DataType.TEXT)
  description: string;

  @Column
  unit_price: number;

  @Column
  is_active: boolean;
}

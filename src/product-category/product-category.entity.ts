import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Product } from 'src/product/product.entity';

@Table({ tableName: 'product_category', updatedAt: false, createdAt: false })
export class ProductCategory extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id_product_category: number;

  @Column({ allowNull: false, unique: true })
  category: string;

  //Relationships
  @HasMany(() => Product)
  product: Product;
}

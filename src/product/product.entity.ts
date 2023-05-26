import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CartDetail } from '../cart-detail/cart-detail.entity';
import { OrderDetail } from '../order-detail/order-detail.entity';
import { ProductCategory } from '../product-category/product-category.entity';

@Table({ tableName: 'products', updatedAt: false, createdAt: false })
export class Product extends Model {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id_product: number;

  @Column
  prod_name: string;

  @ForeignKey(() => ProductCategory)
  @Column({ allowNull: false })
  id_product_category: number;

  @BelongsTo(() => ProductCategory)
  product_category: ProductCategory;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.FLOAT)
  unit_price: number;

  @Column(DataType.TEXT('medium'))
  image: any;

  @Column(DataType.BOOLEAN)
  is_available: boolean;

  @Column
  available_quantity: number;

  // RELATIONSHIPS
  @HasMany(() => OrderDetail)
  order_details: OrderDetail[];

  @HasMany(() => CartDetail)
  cart_details: CartDetail[];
}

import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'tower', updatedAt: false, createdAt: false })
export class Tower extends Model {
  @Column({ primaryKey: true, allowNull: false, autoIncrement: true })
  id_tower: number;

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

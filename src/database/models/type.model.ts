import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Earning } from './earning.model';
import { Revenue } from './revenue.model';

@Table
export class Type extends Model<Type> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public typeId: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  public name: string;

  @Column({ type: DataType.CHAR(3), allowNull: false })
  public code: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  public isFrom: number;

  @HasMany(() => Earning, { foreignKey: 'typeId', as: 'FK_earning_type' })
  public earning: Earning[];

  @HasMany(() => Revenue, { foreignKey: 'typeId', as: 'FK_revenue_type' })
  public revenue: Revenue[];
}
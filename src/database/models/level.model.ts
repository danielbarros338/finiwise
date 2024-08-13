import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Revenue } from './revenue.model';

@Table
export class Level extends Model<Level> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public levelId: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  public name: string;

  @Column({ type: DataType.CHAR(3), allowNull: false })
  public code: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  public classification: number;

  @HasMany(() => Revenue, { foreignKey: 'levelId', as: 'FK_revenue_level' })
  public revenue: Revenue[];
}
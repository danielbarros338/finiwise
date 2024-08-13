import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Revenue } from './revenue.model';

@Table
export class Bill extends Model<Bill> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public billId: number;

  @BelongsTo(() => Revenue, { foreignKey: 'revenueId', as: 'FK_revenue_bill' })
  public revenue: Revenue;

  @Column({ type: DataType.STRING(200), allowNull: false })
  public company: string;

  @Column({ type: DataType.DATE, allowNull: false })
  public dueDate: Date;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  public fullValue: number;
}
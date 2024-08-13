import { Column, Model, Table, HasMany, BelongsTo } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Revenue } from './revenue.model';
import { Installment } from './installment.model';

@Table
export class Financing extends Model<Financing> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public financingId: number;

  @BelongsTo(() => Revenue, { foreignKey: 'revenueId', as: 'FK_revenue_financing' })
  public revenue: Revenue;

  @HasMany(() => Installment, { foreignKey: 'installmentId', as: 'FK_installment_financing' })
  public installmentId: Installment;

  @Column({ type: DataType.DATE, allowNull: false })
  public dueDate: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  public fullValue: number;
}
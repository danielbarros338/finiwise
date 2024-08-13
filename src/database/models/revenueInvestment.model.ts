import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Revenue } from './revenue.model';
import { Investment } from './investment.model';

@Table
export class RevenueInvestment extends Model<RevenueInvestment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public revenueInvestmentId: number;

  @BelongsTo(() => Revenue, { foreignKey: 'revenueId', as: 'FK_revenue' })
  public revenue: Revenue;

  @BelongsTo(() => Investment, { foreignKey: 'investmentId', as: 'FK_investment' })
  public investment: Investment;
}
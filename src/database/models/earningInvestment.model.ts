import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Earning } from './earning.model';
import { Investment } from './investment.model';

@Table({
  underscored: true,
})
export class EarningInvestment extends Model<EarningInvestment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public earningInvestmentId: number;

  @BelongsTo(() => Earning, { foreignKey: 'earningId', as: 'FK_earning_earningInvestment' })
  public earningId: number;

  @BelongsTo(() => Investment, { foreignKey: 'investmentId', as: 'FK_investment_earningInvestment' })
  public investmentId: number;
}
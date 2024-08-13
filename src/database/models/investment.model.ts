import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { RevenueInvestment } from './revenueInvestment.model';
import { EarningInvestment } from './earningInvestment.model';

@Table
export class Investment extends Model<Investment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public investmentId: number;

  @Column({ type: DataType.STRING(200), allowNull: false })
  public instituition: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  public quantity: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  public unitaireValue: number;

  @Column({ type: DataType.DATE, allowNull: false })
  public dueDate: Date;

  @Column({ type: DataType.CHAR(3), allowNull: false })
  public liquidity: string;

  @HasMany(() => RevenueInvestment, { foreignKey: 'revenueInvestmentId', as: 'FK_revenueInvestment_investment' })
  public revenueInvestment: RevenueInvestment[]

  @HasMany(() => EarningInvestment, { foreignKey: 'earningInvestmentId', as: 'FK_earningInvestment_investment' })
  public earningInvestment: EarningInvestment[]
}
import { Column, Model, Table, BelongsTo, HasOne } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { User } from './user.model';
import { Type } from './type.model';
import { Level } from './level.model';
import { Bill } from './bill.model';
import { RevenueInvestment } from './revenueInvestment.model';
import { CardDebit } from './cardDebit.model';
import { Taxes } from './taxes.model';
import { Financing } from './financing.model';

@Table
export class Revenue extends Model<Revenue> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public revenueId: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  public name: string;

  @BelongsTo(() => Type, { foreignKey: 'typeId', as: 'FK_type_revenue' })
  public type: Type;

  @BelongsTo(() => User, { foreignKey: 'userId', as: 'FK_user_revenue' })
  public userId: User;

  @BelongsTo(() => Level, { foreignKey: 'levelId', as: 'FK_level_revenue' })
  public level: Level;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  public value: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  public repeat: boolean;

  @HasOne(() => Bill, { foreignKey: 'revenueId', as: 'FK_bill_revenue' })
  public bill: Bill;

  @HasOne(() => RevenueInvestment, { foreignKey: 'revenueId', as: 'FK_revenueInvestment_revenue' })
  public revenueInvestment: RevenueInvestment;

  @HasOne(() => CardDebit, { foreignKey: 'revenueId', as: 'FK_cardDebit_revenue' })
  public cardDebit: CardDebit;

  @HasOne(() => Taxes, { foreignKey: 'revenueId', as: 'FK_taxes_revenue' })
  public taxes: Taxes;

  @HasOne(() => Financing, { foreignKey: 'revenueId', as: 'FK_financing_revenue' })
  public financing: Financing;
}
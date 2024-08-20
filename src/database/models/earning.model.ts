import { Column, Model, Table, HasOne, BelongsTo } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { User } from './user.model';
import { Type } from './type.model';
import { EarningInvestment } from './earningInvestment.model';
import { Bonuses } from './bonuses.model';
import { EmployementCompensation } from './employementCompensation.model';
import { TaxRefund } from './taxRefund.model';
import { ExtraJob } from './extraJob.model';

@Table
export class Earning extends Model<Earning> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public earningId: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  public name: string;

  @BelongsTo(() => Type, { foreignKey: 'typeId', as: 'FK_type_earning' })
  public typeId: Type;

  @BelongsTo(() => User, { foreignKey: 'userId', as: 'FK_user_earning' })
  public userId: User;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  public value: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  public repeat: boolean;

  @HasOne(() => EarningInvestment, { foreignKey: 'earningId', as: 'FK_earningInvestment_earning' })
  public earningInvestment: EarningInvestment;

  @HasOne(() => Bonuses, { foreignKey: 'earningId', as: 'FK_bonuses_earning' })
  public bonuses: Bonuses;

  @HasOne(() => EmployementCompensation, { foreignKey: 'earningId', as: 'FK_employementCompensation_earning' })
  public employementCompensation: EmployementCompensation;

  @HasOne(() => TaxRefund, { foreignKey: 'earningId', as: 'FK_taxRefund_earning' })
  public taxRefund: TaxRefund;

  @HasOne(() => ExtraJob, { foreignKey: 'earningId', as: 'FK_extraJob_earning' })
  public extraJob: ExtraJob;
}
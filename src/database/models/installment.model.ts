import { Column, Model, Table, BelongsTo } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

import { CardDebit } from "./cardDebit.model";
import { ExtraJob } from "./extraJob.model";
import { Financing } from "./financing.model";

@Table
export class Installment extends Model<Installment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public installmentId: number;

  @BelongsTo(() => CardDebit, { foreignKey: 'cardDebitId', as: 'FK_cardDebit_installment' })
  public cardDebit: CardDebit;

  @BelongsTo(() => ExtraJob, { foreignKey: 'extraJobId', as: 'FK_extraJob_installment' })
  public extraJob: ExtraJob;

  @BelongsTo(() => Financing, { foreignKey: 'financingId', as: 'FK_financing_installment' })
  public financing: Financing;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  public fullValue: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  public totalInstallment: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  public fees: number;
}
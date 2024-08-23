import { Column, Model, Table, HasMany, BelongsTo } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

import { Earning } from "./earning.model";
import { Installment } from "./installment.model";

@Table
export class ExtraJob extends Model<ExtraJob> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public extraJobId: number;

  @BelongsTo(() => Earning, { foreignKey: 'earningId', as: 'FK_earning_extraJob' })
  public earningId: number;

  @HasMany(() => Installment, { foreignKey: 'installmentId', as: 'FK_installment_extraJob' })
  public installmentId: number;

  @Column({ type: DataType.STRING(400), allowNull: false })
  public description: string;
}
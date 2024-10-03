import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Earning } from './earning.model';

@Table({
  underscored: true,
})
export class EmployementCompensation extends Model<EmployementCompensation> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public employementCompensationId: number;

  @BelongsTo(() => Earning, { foreignKey: 'earningId', as: 'FK_earning_employementCompensation' })
  public earningId: number;

  @Column({ type: DataType.STRING(200), allowNull: false })
  public company: string;
}
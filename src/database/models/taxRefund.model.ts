import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Earning } from './earning.model';

@Table({
  underscored: true,
})
export class TaxRefund extends Model<TaxRefund> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public taxRefundId: number;

  @BelongsTo(() => Earning, { foreignKey: 'earningId', as: 'FK_earning_taxRefund' })
  public earningId: number;

  @Column({ type: DataType.STRING(200), allowNull: false })
  public publicPartition: string;
}
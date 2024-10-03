import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Type } from './type.model';
import { Wallet } from './wallet.model';

@Table({
  underscored: true,
})
export class TransactionHistory extends Model<TransactionHistory> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public transactionHistoryId: number;

  @BelongsTo(() => Type, { foreignKey: 'typeId', as: 'FK_transactionHistory_Types' })
  public typeId: number;

  @BelongsTo(() => Wallet, { foreignKey: 'walletId', as: 'FK_transactionHistory_Wallets' })
  public walletId: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  public balance: number;
}
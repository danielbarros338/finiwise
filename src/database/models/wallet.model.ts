import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { User } from './user.model';

@Table
export class Wallet extends Model<Wallet> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public walletId: number;

  @Column({ type: DataType.DOUBLE })
  public balance: number;

  @BelongsTo(() => User, { foreignKey: 'userId', as: 'FK_user_wallet' })
  public userId: number;
}
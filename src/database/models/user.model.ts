import { Column, Model, Table, HasOne, HasMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Wallet } from './wallet.model';
import { Card } from './card.model';
import { Revenue } from './revenue.model';
import { Earning } from './earning.model';

@Table
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public userId: number;

  @Column({ type: DataType.STRING(200), allowNull: false })
  public user: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  public email: string;

  @Column({ type: DataType.STRING(400), allowNull: false })
  public password: string;

  @HasOne(() => Wallet, { foreignKey: 'userId', as: 'FK_wallet_user' })
  public wallet: Wallet;

  @HasMany(() => Card, { foreignKey: 'userId', as: 'FK_card_user' })
  public cards: Card[];

  @HasMany(() => Revenue, { foreignKey: 'userId', as: 'FK_revenue_user' })
  public revenues: Revenue[];

  @HasMany(() => Earning, { foreignKey: 'userId', as: 'FK_earning_user' })
  public earnings: Earning[];
}
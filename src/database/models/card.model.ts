import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { User } from './user.model';
import { FlagCard } from './flagCard.model';

@Table
export class Card extends Model<Card> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public cardId: number;

  @BelongsTo(() => FlagCard, { foreignKey: 'flagId', as: 'FK_flagCard_card' })
  public flagCard: FlagCard;

  @Column({ type: DataType.INTEGER, allowNull: false })
  public lastFournNumbers: number;

  @Column({ type: DataType.STRING(200), allowNull: false })
  public nameInCard: string;

  @BelongsTo(() => User, { foreignKey: 'userId', as: 'FK_user_card' })
  public userId: User;
}
import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

import { Card } from './card.model';

@Table({
  underscored: true,
})
export class FlagCard extends Model<FlagCard> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public flagId: number;

  @Column({ type: DataType.STRING(200), allowNull: false })
  public nameFlag: string;

  @HasMany(() => Card, { foreignKey: 'flagId', as: 'FK_card_flagCard' })
  public cards: Card[];
}
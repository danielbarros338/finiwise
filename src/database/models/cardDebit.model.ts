import { Column, Model, Table, BelongsTo, HasMany } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

import { Revenue } from "./revenue.model";
import { Card } from "./card.model";
import { Installment } from "./installment.model";

@Table
export class CardDebit extends Model<CardDebit> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public cardDebitId: number;

  @BelongsTo(() => Revenue, { foreignKey: 'revenueId', as: 'FK_revenue_cardDebit' })
  public revenue: Revenue;

  @BelongsTo(() => Card, { foreignKey: 'cardId', as: 'FK_card_cardDebit' })
  public card: Card;

  @Column({ type: DataType.DATE, allowNull: false })
  public dueDate: Date;

  @Column({ type: DataType.CHAR(2), allowNull: false })
  public paymentType: string;

  @HasMany(() => Installment, { foreignKey: 'installmentId', as: 'FK_installment_cardDebit' })
  public installment: Installment;
}
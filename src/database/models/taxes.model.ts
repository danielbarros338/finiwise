import { Column, Model, Table, BelongsTo } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";

import { Revenue } from "./revenue.model";

@Table
export class Taxes extends Model<Taxes> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public taxId: number;

  @BelongsTo(() => Revenue, { foreignKey: 'revenueId', as: 'FK_revenue_taxes' })
  public revenue: Revenue;

  @Column({ type: DataType.STRING(200), allowNull: false })
  public publicPartition: string;
}
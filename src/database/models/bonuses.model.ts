import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Earning } from './earning.model';

@Table
export class Bonuses extends Model<Bonuses> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  public bonusId: number;

  @BelongsTo(() => Earning, { foreignKey: 'earningId', as: 'FK_earning_bonuses' })
  public earningId: number;

  @Column({ type: DataType.STRING(200), allowNull: false })
  public description: string;
}
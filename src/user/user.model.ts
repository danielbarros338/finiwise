import { Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
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
}
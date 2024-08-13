import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Dialect } from "sequelize";
import { config } from 'dotenv';

import { User } from 'src/database/models/user.model';

config();

export const Config: SequelizeModuleOptions = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  models: [User],
}

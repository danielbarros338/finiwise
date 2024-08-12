import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { Config } from './config/database.config';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { CardModule } from './card/card.module';
import { EarningModule } from './earning/earning.module';
import { RevenueModule } from './revenue/revenue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot(Config),
    UserModule,
    WalletModule,
    CardModule,
    EarningModule,
    RevenueModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { Config } from './config/database-nest.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { EarningModule } from './modules/earning/earning.module';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    EarningModule,
    WalletModule,
    SequelizeModule.forRoot(Config),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') }
      })
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

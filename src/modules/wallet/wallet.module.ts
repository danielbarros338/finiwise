import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Wallet } from 'src/database/models/wallet.model';

import { WalletService } from './wallet.service';
import { MessagesService } from 'src/services/messages.service';

import { WalletController } from './wallet.controller';


@Module({
  imports: [SequelizeModule.forFeature([Wallet])],
  providers: [WalletService, MessagesService],
  controllers: [WalletController],
  exports: [WalletService]
})
export class WalletModule {}

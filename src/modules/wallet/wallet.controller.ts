import { Controller, Logger, Post, HttpException, Req } from '@nestjs/common';
import { Request } from 'express';

import { Wallet } from 'src/database/models/wallet.model';

import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  private readonly logger = new Logger(WalletController.name);

  constructor(
    private readonly walletService: WalletService
  ) {}

  @Post('create')
  async createWallet(@Req() req: Request): Promise<Wallet> {
    try {
      return await this.walletService.createWallet(req.body.userId);
    } catch (err) {
      this.logger.error('createEarning: \n' + err.message);

      throw new HttpException(err.message, err.status);
    }
  }
}

import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Wallet } from 'src/database/models/wallet.model';

import { MessagesService } from 'src/services/messages.service';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);
  constructor(
    @InjectModel(Wallet) private readonly walletRepository: typeof Wallet,
    private readonly messagesService: MessagesService
  ) {}

  /**
   * Creates a new wallet for the given user ID.
   *
   * @param {number} userId - The ID of the user to create the wallet for.
   * @return {Promise<Wallet>} A promise that resolves with the newly created wallet.
   * @throws {InternalServerErrorException} If there is an error creating the wallet.
   */
  public async createWallet(userId: number): Promise<Wallet> {
    this.logger.debug(this.messagesService.getLogMessage('CREATING_WALLET'));

    const wallet = await this.getWallet(userId);

    if (wallet) {
      this.logger.error("Wallet already exists for user ID: " + userId);
      return wallet;
    }

    try {
      return await this.walletRepository.create<Wallet>({
        userId,
        balance: 0
      });
    } catch (err) {
      this.logger.error('createWallet: \n' + err.message);

      throw new InternalServerErrorException(
        this.messagesService.getErrorMessage('ERROR_SET_WALLET')
      );
    }
  }

  public async getWallet(userId: number): Promise<Wallet> {
    this.logger.debug(this.messagesService.getLogMessage('GETTING_WALLET'));

    try {
      return await this.walletRepository.findOne<Wallet>({ where: { userId } });
    } catch (err) {
      this.logger.error('getWallet: \n' + err.message);

      throw new InternalServerErrorException(
        this.messagesService.getErrorMessage('ERROR_GET_WALLET')
      );
    }
  }
}

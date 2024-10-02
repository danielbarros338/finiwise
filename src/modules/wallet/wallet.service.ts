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

  /**
   * Adds the specified amount to the balance of the wallet for the given user ID.
   *
   * @param {number} userId - The ID of the user to update the wallet for.
   * @param {number} amount - The amount to add to the current balance.
   * @return {Promise<Wallet>} A promise that resolves with the updated wallet object.
   * @throws {InternalServerErrorException} If there is an error updating the wallet.
   */
  public async subtractBalance(userId: number, amount: number): Promise<Wallet> {
    this.logger.debug(this.messagesService.getLogMessage('SUBTRACT_WALLET'));

    const wallet = await this.getWallet(userId);
    const newBalance = wallet.balance - amount;
    
    return await this.updateWallet(wallet, newBalance);
  }
  
  /**
   * Retrieves a wallet from the database based on the provided user ID.
   *
   * @param {number} userId - The ID of the user to retrieve the wallet for.
   * @return {Promise<Wallet>} A promise that resolves with the found wallet object.
   * @throws {InternalServerErrorException} If there is an error retrieving the wallet.
   */
  private async getWallet(userId: number): Promise<Wallet> {
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

  /**
   * Updates the balance of a wallet in the database by adding the specified amount.
   *
   * @param {number} userId - The ID of the user to update the wallet for.
   * @param {number} amount - The amount to add to the current balance.
   * @return {Promise<Wallet>} A promise that resolves with the updated wallet object.
   * @throws {InternalServerErrorException} If there is an error updating the wallet.
   */
  private async updateWallet(wallet: Wallet, amount: number): Promise<Wallet> {
    this.logger.debug(this.messagesService.getLogMessage('UPDATING_WALLET'));

    try {
      return await wallet.update({ balance: amount });
    } catch (err) {
      this.logger.error('updateWallet: \n' + err.message);

      throw new InternalServerErrorException(
        this.messagesService.getErrorMessage('ERROR_UPDATE_WALLET')
      );
    }
  }
}

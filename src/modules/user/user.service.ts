import { Injectable, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../../database/models/user.model';

import { MessagesService } from '../../services/messages.service';
import { CryptoService } from '../../services/crypto.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly messagesService: MessagesService,
    private readonly walletService: WalletService
  ) {}

  /**
   * Creates a new user in the database and creates a wallet for the user.
   *
   * @param {User} user - The user object to be created.
   * @return {Promise<User>} A promise that resolves with the created user object.
   * @throws {InternalServerErrorException} If there is an error creating the user.
   */
  public async createUser(user: User): Promise<User> {
    const userCreated = await this.insertUser(user);
    await this.walletService.createWallet(userCreated.userId);

    return userCreated;
  }

  /**
   * Retrieves a user from the database based on the provided user object.
   *
   * @param {User} user - The user object containing the email to search for.
   * @return {Promise<User>} A promise that resolves with the found user object.
   */
  public async getUser(user: User): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { email: user.email } 
      });
    } catch (err) {
      this.logger.error('getUser: \n' + err);

      throw new InternalServerErrorException(this.messagesService.getErrorMessage('ERROR_GET_USER'));
    }
  }

  /**
   * Retrieves a user from the database based on the provided user ID.
   *
   * @param {number} userId - The ID of the user to be retrieved.
   * @return {Promise<User>} A promise that resolves with the found user object.
   */
  public async getUserById(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findByPk<User>(userId);

      if (!user) {
        this.logger.error('getUserById: \n' +this.messagesService.getErrorMessage('USER_NOT_FOUND'));

        throw new BadRequestException(this.messagesService.getErrorMessage('USER_NOT_FOUND'));
      }

      return user;
    } catch (err) {
      this.logger.error('getUserById: \n' +err.message);

      throw new InternalServerErrorException(this.messagesService.getErrorMessage('ERROR_GET_USER'));
    }
  }

  /**
   * Creates a new user and returns the created user object.
   *
   * @param {User} user - The user object to be created.
   * @return {Promise<User>} A promise that resolves with the created user object.
   * @throws {InternalServerErrorException} If there is an error creating the user.
   */
  private async insertUser(user: User): Promise<User> {
    try {
      const response = await this.userRepository.create<User>(user);
      
      this.logger.log(this.messagesService.getLogMessage('USER_CREATED'));

      return response;
    } catch (err) {
      this.logger.error('createUser: \n' + err.message);

      throw new InternalServerErrorException(this.messagesService.getErrorMessage('ERROR_SIGNING_UP'));
    }
  }
}

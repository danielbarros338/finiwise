import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpStatus } from '@nestjs/common';

import { UserCreatedResponse } from 'src/interfaces/user.interface';

import { User } from '../../database/models/user.model';

import { MessagesService } from '../../services/messages.service';
import { CryptoService } from '../../services/crypto.service';


@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly cryptoService: CryptoService,
    private readonly messagesService: MessagesService,
    @InjectModel(User) private userRepository: typeof User
  ) {}

    /**
   * Creates a new user and returns the user ID.
   *
   * @param {User} user - The user to be created.
   * @return {UserCreatedResponse} An object containing the user ID.
   */
  public async createUser(user: User): Promise<UserCreatedResponse> {
    try {
      const response = await this.userRepository.create<User>(user);

      this.logger.log(this.messagesService.getLogMessage('USER_CREATED'));

      return { userId: response.userId };
    } catch (err) {
      this.logger.error('createUser: \n' + err.message);

      throw new InternalServerErrorException(this.messagesService.getErrorMessage('ERROR_SIGNING_UP'));
    }
  }

    /**
   * Verifies if the required fields (email, password, and user) are present in the user object.
   *
   * @param {User} user - The user object to be verified.
   * @throws {BadRequestException} If any of the required fields are missing.
   */
  public verifyFields(user: User) {
    if (!user.email || !user.password || !user.user) {
      this.logger.warn('verifyFields: \n' + this.messagesService.getErrorMessage('FIELD_REQUIRED'));

      throw new BadRequestException(this.messagesService.getErrorMessage('FIELD_REQUIRED'))
    }
  }

  /**
 * Verifies if a user exists.
 *
 * @param {User} user - The user object to check.
 * @return {Promise<void>} A Promise that resolves when the verification is complete.
 * @throws {ConflictException} If the user already exists.
 * @throws {InternalServerErrorException} If an error occurs during the verification.
 */
  public async verifyUserExists(user: User): Promise<void> {
    try {
      const userExists = await this.getUser(user);
      
      if (userExists) {
        throw new ConflictException(this.messagesService.getErrorMessage('USER_EXISTS'));
      }
    } catch (err) {
      this.logger.error('verifyUserExists: ' + err.message);

      if (err.status !== 409) {
        err.message = this.messagesService.getErrorMessage('ERROR_VERIFY_USER_EXIST');
      }

      throw err;
    }
  }

  /**
   * Encrypts the user's password.
   *
   * @param {User} user - The user object containing the password to be encrypted.
   * @return {void} 
   */
  public encryptPassword(user: User): void {
    user.password = this.cryptoService.encrypt(user.password);
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
      this.logger.error('getUser: \n' +err.message);

      throw new InternalServerErrorException(this.messagesService.getErrorMessage('ERROR_GET_USER'));
    }
  }
}

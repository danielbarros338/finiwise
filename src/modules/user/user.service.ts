import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

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
  public async signUp(user: User): Promise<UserCreatedResponse> {
    try {
      this.verifyFields(user);
      await this.verifyUserExists(user);
      this.encryptPassword(user);

      const response = await this.userRepository.create<User>(user);
      
      this.logger.log(this.messagesService.getLogMessage('USER_CREATED'));

      return { userId: response.userId };
    } catch (err) {
      this.logger.error('createUser: \n' + err.message);

      throw err;
    }
  }

  /**
   * Authenticates a user and returns their user ID and user object.
   *
   * @param {User} user - The user to be authenticated.
   * @return {Promise<any>} An object containing the user ID and user object.
   */
  public async signIn(user: User): Promise<any> {
    try {
      const userFound = await this.getUser(user);

      if (!userFound) {
        this.logger.error('signIn: \n' + this.messagesService.getErrorMessage('USER_NOT_FOUND'));

        throw new BadRequestException(this.messagesService.getErrorMessage('USER_NOT_FOUND'));
      }

      this.verifyPassword(user, userFound.password);

      return { userId: userFound.userId, user: userFound.user };
    } catch (err) {
      this.logger.error('signIn: \n' + err.message);

      throw err;
    }
  }

    /**
   * Verifies if the required fields (email, password, and user) are present in the user object.
   *
   * @param {User} user - The user object to be verified.
   * @throws {BadRequestException} If any of the required fields are missing.
   */
  private verifyFields(user: User) {
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
  private async verifyUserExists(user: User): Promise<void> {
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
  private encryptPassword(user: User): void {
    user.password = this.cryptoService.encrypt(user.password);
  }

    /**
   * Verifies if the provided password matches the user's password.
   *
   * @param {User} user - The user object containing the stored password.
   * @param {string} password - The password to be verified.
   * @return {boolean} True if the password matches, false otherwise.
   */
  private verifyPassword(user: User, hash: string): boolean {
    const passwordMatch = this.cryptoService.verifyPassword(user.password, hash);

    if (!passwordMatch) {
      this.logger.error('verifyPassword: ' + this.messagesService.getErrorMessage('ERROR_SIGNING_IN'));

      throw new UnauthorizedException(this.messagesService.getErrorMessage('ERROR_SIGNING_IN'));
    }

    return passwordMatch;
  }

  /**
   * Retrieves a user from the database based on the provided user object.
   *
   * @param {User} user - The user object containing the email to search for.
   * @return {Promise<User>} A promise that resolves with the found user object.
   */
  private async getUser(user: User): Promise<User> {
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

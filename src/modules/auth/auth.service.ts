import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
  ConflictException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserCreatedResponse } from 'src/interfaces/user.interface';

import { User } from '../../database/models/user.model';

import { UserService } from '../user/user.service';
import { MessagesService } from 'src/services/messages.service';
import { CryptoService } from 'src/services/crypto.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly messagesService: MessagesService,
    private readonly cryptoService: CryptoService
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
      this.validateEmail(user);
      this.validatePassword(user);
      this.encryptPassword(user);

      const response = await this.userService.createUser(user);
      
      this.logger.log(this.messagesService.getLogMessage('USER_CREATED'));

      return { userId: response.userId };
    } catch (err) {
      this.logger.error('createUser: \n' + err.message);

      throw new InternalServerErrorException(this.messagesService.getErrorMessage('ERROR_SIGNING_UP'));
    }
  }

  /**
   * Authenticates a user and returns a JSON Web Token (JWT) access token.
   *
   * @param {any} userReq - The user's request data.
   * @return {Promise<any>} A promise that resolves to an object containing the JWT access token.
   */
  async signIn(userReq: any): Promise<any> {
    try {
      this.verifyFields(userReq);
      this.validateEmail(userReq);
      this.validatePassword(userReq);

      const user = await this.userService.getUser(userReq);

      if (!user) {
        this.logger.error('signIn: \n' + this.messagesService.getErrorMessage('ERROR_SIGNING_IN'));

        throw new BadRequestException(this.messagesService.getErrorMessage('ERROR_SIGNING_IN'));
      }

      this.verifyPassword(userReq, user.password);

      const payload = { userId: user.userId, user: user.user };

      return { access_token: await this.jwtService.signAsync(payload) };
    } catch (err) {
      this.logger.error('signIn: \n' + err.message);

      throw err
    }
  }

  /**
   * Verifies if the provided user password matches the given hash.
   *
   * @param {User} user - The user object containing the password to verify.
   * @param {string} hash - The hash to compare with the user's password.
   * @return {boolean} True if the password matches the hash, false otherwise.
   */
  private verifyPassword(user: User, hash: string): boolean {
    const passwordMatch = this.cryptoService.verifyPassword(user.password, hash);

    if (!passwordMatch) {
      this.logger.error('verifyPassword: ' + this.messagesService.getErrorMessage('USER_NOT_FOUND'));

      throw new BadRequestException(this.messagesService.getErrorMessage('USER_NOT_FOUND'));
    }

    return passwordMatch;
  }

  /**
   * Validates a user's email address against a regular expression.
   *
   * @param {User} user - The user object containing the email to be validated.
   * @return {boolean} True if the email is valid, otherwise throws a BadRequestException.
   */
  private validateEmail(user: User): boolean {
    const regEx =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(regEx.test(user.email)) {
      return true;
    } else {
      throw new BadRequestException(this.messagesService.getErrorMessage('EMAIL_NOT_VALID'));
    };
  }

  /**
   * Validates a user's password against a regular expression.
   *
   * @param {User} user - The user object containing the password to be validated.
   * @return {boolean} True if the password is valid, otherwise throws a BadRequestException.
   */
  private validatePassword(user: User): boolean {
    const regEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(regEx.test(user.password)) {
      return true;
    } else {
      throw new BadRequestException(this.messagesService.getErrorMessage('PASSWORD_NOT_VALID'));
    };
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
      const userExists = await this.userService.getUser(user);
      
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
}

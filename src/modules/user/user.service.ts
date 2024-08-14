import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpStatus } from '@nestjs/common';

import { User } from '../../database/models/user.model';

import { CryptoService } from '../../services/crypto.service';
import { MessagesService } from '../../services/messages.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly cryptoService: CryptoService,
    private readonly messagesService: MessagesService,
    @InjectModel(User) private userRepository: typeof User
  ) {}

    /**
   * Creates a new user account.
   *
   * This function checks for the existence of a user with the provided email address.
   * If the user does not exist, it creates a new user account and hashes the provided password.
   * If the user already exists, it throws an HttpException with a conflict status code.
   * If any error occurs during the sign-up process, it throws an HttpException with an internal server error status code.
   *
   * @param {User} user - The user object containing email, password, and user information
   * @return {Record<string, number>} An object containing the newly created user's ID
   */
  public async signUp(user: User): Promise<Record<string, number>> {
    this.logger.log(
      this.messagesService.getLogMessage('CREATING_USER')
    );

    this.verifyFields(user);

    try {
      const userExists = await this.userRepository.findOne({
        where: { email: user.email } 
      });
      
      if (userExists) {
        this.logger.warn(
          this.messagesService.getErrorMessage('USER_EXISTS')
        );

        throw new HttpException(
          this.messagesService.getErrorMessage('USER_EXISTS'),
          HttpStatus.CONFLICT
        );
      }
    } catch (err) {
      this.logger.warn(
        this.messagesService.getErrorMessage('ERROR_SIGNING_UP') + err.message
      );

      throw new HttpException(
        this.messagesService.getErrorMessage('ERROR_SIGNING_UP') + err.message,
        err.status
      );
    }

    user.password = this.cryptoService.crypt(user.password);

    try {
      const response = await this.userRepository.create<User>(user);

      this.logger.log('User created');

      return { userId: response.userId };
    } catch (err) {
      this.logger.error('An error occuried while signing up: ' + err.message);

      throw new HttpException(
        'An error occuried while signing up',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private verifyFields(user: User) {
    if (!user.email || !user.password || !user.user) {
      this.logger.warn(
        this.messagesService.getErrorMessage('FIELD_REQUIRED')
      );

      throw new HttpException(
        this.messagesService.getErrorMessage('FIELD_REQUIRED'),
        HttpStatus.BAD_REQUEST
      )      
    }
  }
}

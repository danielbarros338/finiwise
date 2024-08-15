import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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

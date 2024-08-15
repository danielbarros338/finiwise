import { BadRequestException, Controller, HttpException, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { UserCreatedResponse } from 'src/interfaces/user.interface';

import { User } from 'src/database/models/user.model';

import { UserService } from './user.service';
import { MessagesService } from '../../services/messages.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserService.name);
  constructor(
    public userService: UserService,
    public messagesService: MessagesService
  ) {}

  @Post('/signup')
  async signUp(@Req() req: Request): Promise<UserCreatedResponse> {
    this.logger.log(this.messagesService.getLogMessage('CREATING_USER'));

    try {
      this.userService.verifyFields(req.body);
      await this.userService.verifyUserExists(req.body);
      this.userService.encryptPassword(req.body);

      return await this.userService.createUser(req.body);
    } catch (err) {
      this.logger.error('signUp: \n' + err.message);

      throw new HttpException(err.message, err.status);
    }
  }

  @Post('/signin')
  async signIn(@Req() req: Request): Promise<any> {
    this.logger.log(this.messagesService.getLogMessage('SIGNING_IN'));

    try {
      const user = await this.userService.getUser(req.body);

      if (!user) {
        this.logger.error('signIn: \n' + this.messagesService.getErrorMessage('USER_NOT_FOUND'));

        throw new BadRequestException(this.messagesService.getErrorMessage('USER_NOT_FOUND'));
      }

      this.userService.verifyPassword(req.body, user.password);

      return { userId: user.userId, user: user.user };
    } catch (err) {
      this.logger.error('signIn: \n' + err.message);

      throw new HttpException(err.message, err.status);
    }
  }
}

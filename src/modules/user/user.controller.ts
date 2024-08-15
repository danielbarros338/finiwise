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
      return await this.userService.signUp(req.body);
    } catch (err) {
      this.logger.error('signUp: \n' + err.message);

      throw new HttpException(err.message, err.status);
    }
  }

  @Post('/signin')
  async signIn(@Req() req: Request): Promise<any> {
    this.logger.log(this.messagesService.getLogMessage('SIGNING_IN'));

    try {
      return await this.userService.signIn(req.body);
    } catch (err) {
      this.logger.error('signIn: \n' + err.message);

      throw new HttpException(err.message, err.status);
    }
  }
}

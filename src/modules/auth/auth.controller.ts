import { Controller, Post, Req, Logger, HttpException } from '@nestjs/common';
import { Request } from 'express';

import { AuthResponse } from 'src/interfaces/auth.interface';

import { AuthService } from './auth.service';
import { MessagesService } from '../../services/messages.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    public authService: AuthService,
    public messagesService: MessagesService
  ){}

  @Post('/signin')
  async signIn(@Req() req: Request): Promise<any> {
    this.logger.log(this.messagesService.getLogMessage('SIGNING_IN'));

    try {
      return await this.authService.signIn(req.body);
    } catch (err) {
      this.logger.error('signIn: \n' + err.message);

      throw new HttpException(err.message, err.status);
    }
  }

  @Post('/signup')
  async signUp(@Req() req: Request): Promise<AuthResponse> {
    this.logger.log(this.messagesService.getLogMessage('CREATING_USER'));

    try {
      return await this.authService.signUp(req.body);
    } catch (err) {
      this.logger.error('signUp: \n' + err.message);

      throw new HttpException(err.message, err.status);
    }
  }
}

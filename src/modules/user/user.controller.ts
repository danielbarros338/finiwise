import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}

  @Post('/signup')
  async signUp(@Req() req: Request): Promise<any> {
    return await this.userService.signUp(req.body);
  }
}

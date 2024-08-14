import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpStatus } from '@nestjs/common';

import { User } from '../../database/models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  public async signUp(user: User): Promise<Record<string, number>> {
    try {
      const response = await this.userRepository.create<User>(user);

      return { userId: response.userId };
    } catch (err) {
      throw new HttpException(
        'An error occuried while signing up',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

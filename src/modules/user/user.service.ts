import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpStatus } from '@nestjs/common';

import { User } from '../../database/models/user.model';

import { crypt } from '../../utils/crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User
  ) {}

  public async signUp(user: User): Promise<Record<string, number>> {
    if (!user.email || !user.password || !user.user) {
      throw new HttpException(
        'Email, password and user is required',
        HttpStatus.BAD_REQUEST
      )      
    }

    try {
      const userExists = await this.userRepository.findOne({
        where: { email: user.email } 
      });
      
      if (userExists) {
        throw new HttpException(
          'User already exists',
          HttpStatus.CONFLICT
        );
      }
    } catch (err) {
      throw new HttpException(
        'An error occuried while signing up: ' + err.message,
        err.status
      );
    }

    user.password = crypt(user.password);

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

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../database/models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  public async signUp(user: User): Promise<User> {
    return await this.userRepository.create<User>({ ...user });
  }
}

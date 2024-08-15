import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '../../database/models/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { CryptoService } from '../../services/crypto.service';
import { MessagesService } from 'src/services/messages.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, CryptoService, MessagesService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}

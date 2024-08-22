import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from 'src/modules/user/user.module';

import { EarningService } from './earning.service';
import { EarningController } from './earning.controller';

import { Earning } from 'src/database/models/earning.model';
import { Type } from 'src/database/models/type.model';
import { EmployementCompensation } from 'src/database/models/employementCompensation.model';
import { Bonuses } from 'src/database/models/bonuses.model';

import { MessagesService } from 'src/services/messages.service';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([
      Earning,
      Type,
      EmployementCompensation,
      Bonuses
    ])
  ],
  controllers: [EarningController],
  providers: [EarningService, MessagesService],
})
export class EarningModule {}

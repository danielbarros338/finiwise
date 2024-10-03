import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from 'src/modules/user/user.module';
import { WalletModule } from 'src/modules/wallet/wallet.module';

import { EarningService } from './earning.service';
import { EarningController } from './earning.controller';

import { Earning } from 'src/database/models/earning.model';
import { Type } from 'src/database/models/type.model';
import { EmployementCompensation } from 'src/database/models/employementCompensation.model';
import { Bonuses } from 'src/database/models/bonuses.model';

import { MessagesService } from 'src/services/messages.service';
import { TaxRefund } from 'src/database/models/taxRefund.model';
import { ExtraJob } from 'src/database/models/extraJob.model';
import { EarningInvestment } from 'src/database/models/earningInvestment.model';

@Module({
  imports: [
    UserModule,
    WalletModule,
    SequelizeModule.forFeature([
      Earning,
      Type,
      EmployementCompensation,
      Bonuses,
      TaxRefund,
      ExtraJob,
      EarningInvestment,
    ])
  ],
  controllers: [EarningController],
  providers: [EarningService, MessagesService],
})
export class EarningModule {}

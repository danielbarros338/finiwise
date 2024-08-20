import { Module } from '@nestjs/common';
import { EarningService } from './earning.service';

import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [EarningService]
})
export class EarningModule {}

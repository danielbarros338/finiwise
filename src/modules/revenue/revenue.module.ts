import { Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';

import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [RevenueService]
})
export class RevenueModule {}

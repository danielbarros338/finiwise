import { Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';

import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [RevenueService],
  controllers: [RevenueController],
})
export class RevenueModule {}

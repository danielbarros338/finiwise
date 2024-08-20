import { Module } from '@nestjs/common';
import { EarningService } from './earning.service';

@Module({
  providers: [EarningService]
})
export class EarningModule {}

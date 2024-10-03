import { Controller, Post, Req, Logger, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

import { EarningService } from './earning.service';

@Controller('earning')
export class EarningController {
  private readonly logger = new Logger(EarningController.name);

  constructor(private readonly earningService: EarningService) {}

  @Post('create-earning')
  @HttpCode(HttpStatus.CREATED)
  public async createEarning(@Req() req: Request): Promise<any> {
    try {
      return await this.earningService.createEarning(req.body);
    } catch (err) {
      this.logger.error('createEarning: \n' + err.message);

      throw new HttpException(err.message, err.status);
    }
  }

}

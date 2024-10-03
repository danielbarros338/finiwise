import { Controller, Post, Req, Logger, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

@Controller('revenue')
export class RevenueController {
  private readonly logger = new Logger(RevenueController.name);

  constructor() {}
}

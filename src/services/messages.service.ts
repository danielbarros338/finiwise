import { Injectable } from '@nestjs/common';

import * as logMessages from '../config/constants/log-messages.json';
import * as errorMessages from '../config/constants/error-messages.json';

@Injectable()
export class MessagesService {
  private readonly logMessages;
  private readonly errorMessages;

  constructor() {
    this.logMessages = logMessages;
    this.errorMessages = errorMessages;
  }

  getLogMessage(key: string): string {
    return this.logMessages[key] || 'Unknown log message';
  }

  getErrorMessage(key: string): string {
    return this.errorMessages[key] || 'Unknown error message';
  }
}
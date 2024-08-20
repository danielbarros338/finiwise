import { Injectable, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Earning } from 'src/database/models/earning.model';
import { User } from 'src/database/models/user.model';

import { EarningReq } from 'src/interfaces/earning.interface';

import { MessagesService } from 'src/services/messages.service';

@Injectable()
export class EarningService {
  public readonly logger = new Logger(EarningService.name);

  constructor(
    private readonly messagesServices: MessagesService,
    @InjectModel(Earning) private readonly earningRepository: typeof Earning,
    @InjectModel(User) private readonly userRepository: typeof User
  ) {}

  public async setEarning(earningReq: EarningReq): Promise<Earning> {
    this.logger.log(this.messagesServices.getLogMessage('SET_EARNING'));

    try {
      const user = await this.userRepository.findByPk(earningReq.userId);

      if (!user) {
        throw new BadRequestException(this.messagesServices.getErrorMessage('ERROR_VERIFY_USER_EXIST'));
      }

      return await this.earningRepository.create<Earning>({
        ...earningReq,
        userId: user
      });
    } catch (err) {
      this.logger.error('setEarning: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_SET_EARNING'));
    }
  }
}

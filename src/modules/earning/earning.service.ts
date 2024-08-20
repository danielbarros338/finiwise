import { Injectable, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Earning } from 'src/database/models/earning.model';

import { EarningReq } from 'src/interfaces/earning.interface';

import { MessagesService } from 'src/services/messages.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class EarningService {
  public readonly logger = new Logger(EarningService.name);

  constructor(
    private readonly messagesServices: MessagesService,
    private readonly userServices: UserService,
    @InjectModel(Earning) private readonly earningRepository: typeof Earning,
  ) {}

  /**
   * Creates a new earning based on the provided earning request.
   *
   * @param {EarningReq} earningReq - The earning request object containing the necessary information to create a new earning.
   * @return {Promise<Earning>} A promise that resolves with the newly created earning.
   */
  public async setEarning(earningReq: EarningReq): Promise<Earning> {
    this.logger.log(this.messagesServices.getLogMessage('SET_EARNING'));

    try {
      const user = await this.userServices.getUserById(earningReq.userId);

      return await this.earningRepository.create<Earning>({
        ...earningReq,
        userId: user
      });
    } catch (err) {
      this.logger.error('setEarning: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_SET_EARNING'));
    }
  }

  /**
 * Retrieves all earnings associated with a specific user.
 *
 * @param {number} userId - The ID of the user.
 * @return {Promise<Earning[]>} A promise that resolves with an array of earnings.
 * @throws {InternalServerErrorException} If there is an error retrieving the earnings.
 */
  public async getEarningsByUserId(userId: number): Promise<Earning[]> {
    try {
      return await this.earningRepository.findAll<Earning>({ where: { userId } });
    } catch (err) {
      this.logger.error('getEarningsByUserId: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_GET_EARNINGS_BY_USER_ID'));
    }
  }

  public async updateEarning(earning: Earning): Promise<[affectedCount: number]> {
    try {
      return await this.earningRepository.update<Earning>(earning, { where: { earningId: earning.earningId } })
    } catch (err) {
      this.logger.error('updateEarning: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_UPDATE_EARNING'));
    }
  }
}

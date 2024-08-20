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
    this.logger.log(this.messagesServices.getLogMessage('GET_EARNINGS_BY_USER_ID'));

    try {
      return await this.earningRepository.findAll<Earning>({ where: { userId } });
    } catch (err) {
      this.logger.error('getEarningsByUserId: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_GET_EARNINGS_BY_USER_ID'));
    }
  }

  /**
   * Updates an existing earning in the database.
   *
   * @param {Earning} earning - The earning object to be updated.
   * @return {Promise<[affectedCount: number]>} A promise that resolves with the number of affected rows.
   */
  public async updateEarning(earning: Earning): Promise<[affectedCount: number]> {
    this.logger.log(this.messagesServices.getLogMessage('UPDATE_EARNING'));

    try {
      return await this.earningRepository.update<Earning>(earning, { where: { earningId: earning.earningId } })
    } catch (err) {
      this.logger.error('updateEarning: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_UPDATE_EARNING'));
    }
  }

  /**
   * Updates multiple existing earnings in the database.
   *
   * @param {Earning[]} earnings - An array of earning objects to be updated.
   * @return {Promise<[affectedCount: number]>} A promise that resolves with the total number of affected rows.
   */
  public async updateEarnings(earnings: Earning[]): Promise<[affectedCount: number]> {
    this.logger.log(this.messagesServices.getLogMessage('UPDATE_EARNINGS'));

    let affectedCount = 0;
    try {
      for (const earning of earnings) {
        const result = await this.earningRepository.update<Earning>(earning, { where: { earningId: earning.earningId } })
        
        affectedCount += result[0]
      }

      return [affectedCount]
    } catch (err) {
      this.logger.error('updateEarnings: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_UPDATE_EARNING'));
    }
  }

  /**
   * Deletes an existing earning from the database.
   *
   * @param {Earning} earning - The earning object to be deleted.
   * @return {Promise<number>} A promise that resolves with the number of affected rows.
   */
  public async deleteEarning(earning: Earning): Promise<number> {
    this.logger.log(this.messagesServices.getLogMessage('DELETE_EARNING'));

    try {
      return await this.earningRepository.destroy<Earning>({ where: { earningId: earning.earningId } })
    } catch (err) {
      this.logger.error('deleteEarning: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_DELETE_EARNING'));
    }
  }
}

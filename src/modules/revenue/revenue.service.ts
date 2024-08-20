import { Injectable, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Revenue } from 'src/database/models/revenue.model';

import { RevenueReq } from 'src/interfaces/revenue.interface';

import { MessagesService } from 'src/services/messages.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RevenueService {
  public readonly logger = new Logger(RevenueService.name);

  constructor(
    private readonly messagesServices: MessagesService,
    private readonly userServices: UserService,
    @InjectModel(Revenue) private readonly revenueRepository: typeof Revenue,
  ) {}

  /**
   * Creates a new revenue based on the provided revenue request.
   *
   * @param {RevenueReq} revenueReq - The revenue request object containing the necessary information to create a new revenue.
   * @return {Promise<Revenue>} A promise that resolves with the newly created revenue.
   */
  public async setRevenue(revenueReq: RevenueReq): Promise<Revenue> {
    this.logger.log(this.messagesServices.getLogMessage('SET_REVENUE'));

    try {
      const user = await this.userServices.getUserById(revenueReq.userId);

      return await this.revenueRepository.create<Revenue>({ ...revenueReq, userId: user });
    } catch (err) {
      this.logger.error('setRevenue: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_SET_REVENUE'));
    }
  }

  /**
   * Updates an existing revenue in the database.
   *
   * @param {Revenue} revenue - The revenue object to be updated.
   * @return {Promise<[affectedCount: number]>} A promise that resolves with an array containing the number of affected rows.
   */
  public async getRevenuesByUserId(userId: number): Promise<Revenue[]> {
    this.logger.log(this.messagesServices.getLogMessage('GET_REVENUES_BY_USER_ID'));

    try {
      return await this.revenueRepository.findAll<Revenue>({ where: { userId } });
    } catch (err) {
      this.logger.error('getRevenuesByUserId: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_GET_REVENUES_BY_USER_ID'));
    }
  }

  /**
   * Updates an existing revenue in the database.
   *
   * @param {Revenue} revenue - The revenue object to be updated.
   * @return {Promise<[affectedCount: number]>} A promise that resolves with an array containing the number of affected rows.
   */
  public async updateRevenue(revenue: Revenue): Promise<[affectedCount: number]> {
    this.logger.log(this.messagesServices.getLogMessage('UPDATE_REVENUE'));

    try {
      return await this.revenueRepository.update<Revenue>(revenue, { where: { revenueId: revenue.revenueId } })
    } catch (err) {
      this.logger.error('updateRevenue: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_UPDATE_REVENUE'));
    }
  }

  /**
   * Updates multiple revenues in the database.
   *
   * @param {Revenue[]} revenues - An array of revenue objects to be updated.
   * @return {Promise<[affectedCount: number]>} A promise that resolves with an array containing the number of affected rows.
   */
  public async updateRevenues(revenues: Revenue[]): Promise<[affectedCount: number]> {
    this.logger.log(this.messagesServices.getLogMessage('UPDATE_REVENUES'));

    let affectedCount = 0;
    try {
      for (const revenue of revenues) {
        const result = await this.revenueRepository.update<Revenue>(revenue, { where: { revenueId: revenue.revenueId } })
        
        affectedCount += result[0]
      }

      return [affectedCount]
    } catch (err) {
      this.logger.error('updateRevenues: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_UPDATE_REVENUES'));
    }
  }

  /**
   * Deletes an existing revenue from the database.
   *
   * @param {Revenue} revenue - The revenue object to be deleted.
   * @return {Promise<number>} A promise that resolves with the number of affected rows.
   */
  public async deleteEarning(revenue: Revenue): Promise<number> {
    this.logger.log(this.messagesServices.getLogMessage('DELETE_REVENUE'));

    try {
      return await this.revenueRepository.destroy<Revenue>({ where: { revenueId: revenue.revenueId } })
    } catch (err) {
      this.logger.error('deleteRevenue: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_DELETE_REVENUE'));
    }
  }
}

import { Injectable, Logger, InternalServerErrorException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Earning } from 'src/database/models/earning.model';
import { Type } from 'src/database/models/type.model';
import { EmployementCompensation } from 'src/database/models/employementCompensation.model';

import { EarningReq } from 'src/interfaces/earning.interface';

import { MessagesService } from 'src/services/messages.service';
import { EmployementCompensationOption } from 'src/interfaces/employementCompensation.interface';

@Injectable()
export class EarningService {
  public readonly logger = new Logger(EarningService.name);

  constructor(
    private readonly messagesServices: MessagesService,
    @InjectModel(Type) private readonly typeRepository: typeof Type,
    @InjectModel(Earning) private readonly earningRepository: typeof Earning,
    @InjectModel(EmployementCompensation) private readonly employementCompensationRepository: typeof EmployementCompensation
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
      const typeId = await this.getTypeIdByCode(earningReq.typeCode);

      const earning = await this.earningRepository.create<Earning>({
        ...earningReq,
        typeId
      });

      await this.setEarningType(earningReq, earning);

      return earning;
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

  /**
   * Retrieves the type ID associated with the provided code.
   *
   * @param {string} code - The code to retrieve the type ID for.
   * @return {Promise<number>} A promise that resolves with the type ID.
   */
  private async getTypeIdByCode(code: string): Promise<number> {
    this.logger.log(this.messagesServices.getLogMessage('GET_TYPE_ID_BY_CODE'));

    try {
      const type = await this.typeRepository.findOne({ attributes: ['typeId'], where: { code } });

      return type.typeId;
    } catch (err) {
      this.logger.error('getTypeIdByCode: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_GET_TYPE_ID_BY_CODE'));
    }
  }

  /**
   * Sets the earning type for the provided earning request and earning object.
   *
   * @param {EarningReq} earningReq - The earning request object containing the necessary information to set the earning type.
   * @param {Earning} earning - The earning object to be updated with the new earning type.
   * @return {Promise<void>} A promise that resolves when the earning type has been successfully set.
   */
  private async setEarningType(
    earningReq: EarningReq,
    earning: Earning
  ): Promise<void> {
    this.logger.log(this.messagesServices.getLogMessage('SET_REVENUE_TYPE'));

    try {
      switch(earningReq.typeCode) {
        case 'INE':
          earning.employementCompensation = await this.setEmployementCompensation(earningReq.option, earning.earningId);
          break;
      }
    } catch (err) {
      this.logger.error('setEarningType: \n' + err.message);

      throw err;
    }
  }

  /**
 * Creates a new EmployementCompensation record in the database.
 *
 * @param {EmployementCompensationOption} option - The option for employment compensation.
 * @param {number} earningId - The ID of the earning.
 * @return {Promise<EmployementCompensation>} A promise that resolves with the created EmployementCompensation.
 * @throws {InternalServerErrorException} If there is an error creating the EmployementCompensation.
 */
  private async setEmployementCompensation(
    option: EmployementCompensationOption,
    earningId: number
  ): Promise<EmployementCompensation> {
    this.logger.log(this.messagesServices.getLogMessage('SET_EMPLOYMENT_COMPENSATION'));

    try {
      return await this.employementCompensationRepository.create<EmployementCompensation>({
        earningId,
        company: option.company
      })
    } catch (err) {
      this.logger.error('setEmployementCompensation: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_SET_EMPLOYMENT_COMPENSATION'));
    }
  }
}

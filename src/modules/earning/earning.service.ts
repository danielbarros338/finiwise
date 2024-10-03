import { Injectable, Logger, InternalServerErrorException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Earning } from 'src/database/models/earning.model';
import { Type } from 'src/database/models/type.model';
import { EmployementCompensation } from 'src/database/models/employementCompensation.model';
import { Bonuses } from 'src/database/models/bonuses.model';
import { TaxRefund } from 'src/database/models/taxRefund.model';
import { ExtraJob } from 'src/database/models/extraJob.model';
import { EarningInvestment } from 'src/database/models/earningInvestment.model';
import { TransactionHistory } from 'src/database/models/transactionHistory.model';

import { EarningReq } from 'src/interfaces/earning.interface';
import { EmployementCompensationOption } from 'src/interfaces/employementCompensation.interface';
import { BonusesOption } from 'src/interfaces/bonuses.interface';
import { TaxRefundOption } from 'src/interfaces/taxRefund.interface';
import { ExtraJobOption } from 'src/interfaces/extraJob.interface';
import { EarningInvestmentOption } from 'src/interfaces/earningInvestment.interface';

import { MessagesService } from 'src/services/messages.service';
import { WalletService } from 'src/modules/wallet/wallet.service';


@Injectable()
export class EarningService {
  public readonly logger = new Logger(EarningService.name);

  constructor(
    private readonly messagesServices: MessagesService,
    private readonly walletService: WalletService,
    @InjectModel(TransactionHistory) private readonly transactionHistoryRepository: typeof TransactionHistory,
    @InjectModel(Type) private readonly typeRepository: typeof Type,
    @InjectModel(Earning) private readonly earningRepository: typeof Earning,
    @InjectModel(EmployementCompensation) private readonly employementCompensationRepository: typeof EmployementCompensation,
    @InjectModel(Bonuses) private readonly bonusesRepository: typeof Bonuses,
    @InjectModel(TaxRefund) private readonly taxRefundRepository: typeof TaxRefund,
    @InjectModel(ExtraJob) private readonly extraJobRepository: typeof ExtraJob,
    @InjectModel(EarningInvestment) private readonly earningInvestmentRepository: typeof EarningInvestment
  ) {}



  /**
   * Creates a new earning and adds the corresponding value to the user's balance.
   *
   * @param {EarningReq} earningReq - The earning request object containing the necessary information to create a new earning.
   * @return {Promise<Earning>} A promise that resolves with the newly created earning.
   * @throws {InternalServerErrorException} If there is an error creating the earning or adding the value to the user's balance.
   */
  public async createEarning(earningReq: EarningReq): Promise<Earning> {
    this.logger.debug(this.messagesServices.getLogMessage('CREATE_EARNING'));

    const typeId = await this.getTypeIdByCode(earningReq.typeCode);
    const earning = await this.setEarning(earningReq, typeId);

    await this.setEarningType(earningReq, earning);
    await this.walletService.addBalance(earningReq.userId, earningReq.value);

    return earning;
  }

  public async changeEarning(earningModified: Earning): Promise<Earning> {
    this.logger.debug(this.messagesServices.getLogMessage('CHANGE_EARNING'));

    const earning = await this.getEarningById(earningModified.earningId);

    if (!earning) {
      throw new BadRequestException(this.messagesServices.getErrorMessage('ERROR_CHANGE_EARNING'));
    }

    const valueDiference = earning.value - earningModified.value;

    if (valueDiference < 0) {
      await this.walletService.addBalance(earningModified.userId, valueDiference);
    } else if (valueDiference > 0) {
      await this.walletService.subtractBalance(earningModified.userId, Math.abs(valueDiference));
    }

    //TODO: add a transaction history register
    // CHANGE THE PROJECT DO DDD?

    await this.updateEarning(earningModified);

    return earningModified;
  }

  /**
 * Retrieves all earnings associated with a specific user.
 *
 * @param {number} userId - The ID of the user.
 * @return {Promise<Earning[]>} A promise that resolves with an array of earnings.
 * @throws {InternalServerErrorException} If there is an error retrieving the earnings.
 */
  private async getEarningsByUserId(userId: number): Promise<Earning[]> {
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
  private async updateEarning(earning: Earning): Promise<[affectedCount: number]> {
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
  private async updateEarnings(earnings: Earning[]): Promise<[affectedCount: number]> {
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
  private async deleteEarning(earning: Earning): Promise<number> {
    this.logger.log(this.messagesServices.getLogMessage('DELETE_EARNING'));

    try {
      return await this.earningRepository.destroy<Earning>({ where: { earningId: earning.earningId } })
    } catch (err) {
      this.logger.error('deleteEarning: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_DELETE_EARNING'));
    }
  }

  /**
   * Creates a new earning in the database.
   *
   * @param {EarningReq} earningReq - The earning request object containing the necessary information to create a new earning.
   * @param {number} typeId - The type ID associated with the earning.
   * @return {Promise<Earning>} A promise that resolves with the newly created earning.
   */
  private async setEarning(earningReq: EarningReq, typeId: number): Promise<Earning> {
    this.logger.log(this.messagesServices.getLogMessage('SET_EARNING'));

    try {
      return await this.earningRepository.create<Earning>({
        ...earningReq,
        typeId
      });
    } catch (err) {
      this.logger.error('setEarning: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_SET_EARNING'));
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
    this.logger.log(this.messagesServices.getLogMessage('SET_EARNING_TYPE'));

    switch(earningReq.typeCode) {
      case 'INE':
        earning.earningInvestment = await this.setEarningInvestment(
          earningReq.option as EarningInvestmentOption,
          earning.earningId
        )
      case 'TRE':
        earning.extraJob = await this.setExtraJob(
          earningReq.option as ExtraJobOption,
          earning.earningId
        )
      case 'RST':
        earning.taxRefund = await this.setTaxRefund(
          earningReq.option as TaxRefundOption,
          earning.earningId
        );
        break;
      case 'BON':
        earning.bonuses = await this.setBonuses(
          earningReq.option as BonusesOption,
          earning.earningId
        );
        break;
      case 'SAL':
        earning.employementCompensation = await this.setEmployementCompensation(
          earningReq.option as EmployementCompensationOption,
          earning.earningId
        );
        break;
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
      this.logger.debug(this.messagesServices.getLogMessage('DELETE_EARNING'));

      await this.earningRepository.destroy({ where: { earningId } });

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_SET_EMPLOYMENT_COMPENSATION'));
    }
  }

  private async setBonuses(option: BonusesOption, earningId: number): Promise<Bonuses> {
    this.logger.log(this.messagesServices.getLogMessage('SET_BONUSES'));

    try {
      return await this.bonusesRepository.create<Bonuses>({
        earningId,
        description: option.description
      })
    } catch (err) {
      this.logger.error('setBonuses: \n' + err.message);
      this.logger.debug(this.messagesServices.getLogMessage('DELETE_EARNING'));

      await this.earningRepository.destroy({ where: { earningId } });

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_SET_BONUSES'));
    }
  }

  /**
   * Sets the tax refund for an earning.
   *
   * @param {TaxRefundOption} option - The tax refund option.
   * @param {number} earningId - The ID of the earning.
   * @return {Promise<TaxRefund>} The created tax refund.
   */
  private async setTaxRefund(option: TaxRefundOption, earningId: number): Promise<TaxRefund> {
    this.logger.log(this.messagesServices.getLogMessage('SET_TAX_REFUND'));

    try {
      return await this.taxRefundRepository.create<TaxRefund>({
        earningId,
        publicPartition: option.publicPartition
      })
    } catch (err) {
      this.logger.error('setTaxRefund: \n' + err.message);
      this.logger.debug(this.messagesServices.getLogMessage('DELETE_EARNING'));

      await this.earningRepository.destroy({ where: { earningId } });

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_SET_TAX_REFUND'));
    }
  }

  /**
   * Sets the extra job for an earning.
   *
   * @param {ExtraJobOption} option - The extra job option.
   * @param {number} earningId - The ID of the earning.
   * @return {Promise<ExtraJob>} The created extra job.
   */
  private async setExtraJob(option: ExtraJobOption, earningId: number): Promise<ExtraJob> {
    this.logger.log(this.messagesServices.getLogMessage('SET_EXTRA_JOB'));

    try {
      return await this.extraJobRepository.create<ExtraJob>({
        earningId,
        description: option.description,
        installmentId: option.installmentId
      })
    } catch (err) {
      this.logger.error('setExtraJob: \n' + err.message);
      this.logger.debug(this.messagesServices.getLogMessage('DELETE_EARNING'));

      await this.earningRepository.destroy({ where: { earningId } });

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_SET_EXTRA_JOB'));
    }
  }

  /**
   * Sets the earning investment for a given earning ID.
   *
   * @param {EarningInvestmentOption} option - The option for earning investment.
   * @param {number} earningId - The ID of the earning.
   * @return {Promise<EarningInvestment>} A promise that resolves with the created EarningInvestment.
   * @throws {InternalServerErrorException} If there is an error creating the EarningInvestment.
   */
  private async setEarningInvestment(option: EarningInvestmentOption, earningId: number): Promise<EarningInvestment> {
    this.logger.log(this.messagesServices.getLogMessage('SET_EARNING_INVESTMENT'));

    try {
      return await this.earningInvestmentRepository.create<EarningInvestment>({
        earningId,
        investmentId: option.investmentId
      })
    } catch (err) {
      this.logger.error('setEarningInvestment: \n' + err.message);
      this.logger.debug(this.messagesServices.getLogMessage('DELETE_EARNING'));

      await this.earningRepository.destroy({ where: { earningId } });

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_SET_EARNING_INVESTMENT'));
    }
  }

  private async getEarningById(earningId: number): Promise<Earning> {
    try {
      return await this.earningRepository.findOne({ where: { earningId } })
    } catch (err) {
      this.logger.error('getEarningById: \n' + err.message);

      throw new InternalServerErrorException(this.messagesServices.getErrorMessage('ERROR_GET_EARNING_BY_ID'));
    }
  }
}

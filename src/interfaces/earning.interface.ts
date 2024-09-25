import { BonusesOption } from "./bonuses.interface";
import { EarningInvestmentOption } from "./earningInvestment.interface";
import { EmployementCompensationOption } from "./employementCompensation.interface";
import { ExtraJobOption } from "./extraJob.interface";
import { TaxRefundOption } from "./taxRefund.interface";

export interface EarningReq {
  name: string;
  typeCode: string;
  userId: number;
  value: number;
  repeat: boolean;
  option: 
    EmployementCompensationOption|
    BonusesOption|
    EarningInvestmentOption|
    TaxRefundOption|
    ExtraJobOption;
}

export interface Earning extends EarningReq {
  earningId: number;
  createdAt: Date;
  updatedAt: Date;
}

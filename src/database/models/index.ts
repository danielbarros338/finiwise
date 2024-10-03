import { Bill } from "./bill.model";
import { Bonuses } from "./bonuses.model";
import { Card } from "./card.model";
import { CardDebit } from "./cardDebit.model";
import { Earning } from "./earning.model";
import { EarningInvestment } from "./earningInvestment.model";
import { EmployementCompensation } from "./employementCompensation.model";
import { ExtraJob } from "./extraJob.model";
import { Financing } from "./financing.model";
import { FlagCard } from "./flagCard.model";
import { Installment } from "./installment.model";
import { Investment } from "./investment.model";
import { Level } from "./level.model";
import { Revenue } from "./revenue.model";
import { RevenueInvestment } from "./revenueInvestment.model";
import { Taxes } from "./taxes.model";
import { TaxRefund } from "./taxRefund.model";
import { Type } from "./type.model";
import { User } from "./user.model";
import { Wallet } from "./wallet.model";
import { TransactionHistory } from "./transactionHistory.model";

export default [
  User,
  Wallet,
  Card,
  FlagCard,
  Revenue,
  Earning,
  CardDebit,
  Installment,
  ExtraJob,
  Financing,
  Type,
  Level,
  Bill,
  RevenueInvestment,
  EarningInvestment,
  TaxRefund,
  Taxes,
  Bonuses,
  EmployementCompensation,
  Investment,
  TransactionHistory
]
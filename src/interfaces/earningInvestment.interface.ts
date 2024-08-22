export interface EarningInvestmentOption {
  investmentId: number;
}

export interface EarningInvestment extends EarningInvestmentOption {
  earningInvestmentId: number;
  earningId: number;
  createdAt: Date;
  updatedAt: Date;
}
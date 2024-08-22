export interface InvestmentReq {
  instituition: string;
  quantity: number;
  unitaireValue: number;
  dueDate: Date;
  liquidity: string;
}

export interface Investment extends InvestmentReq {
  investmentId: number;
  createdAt: Date;
  updatedAt: Date;
}

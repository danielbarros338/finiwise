export interface InstallmentOption {
  cardDebitId: number;
  extraJobId: number;
  financingId: number;
  fullValue: number;
  totalInstallment: number;
  fees: number;
}

export interface Installment extends InstallmentOption {
  installmentId: number;
  createdAt: Date;
  updatedAt: Date;
}

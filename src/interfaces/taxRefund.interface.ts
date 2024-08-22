export interface TaxRefundOption {
  publicPartition: string;
}

export interface TaxRefund extends TaxRefundOption {
  taxRefundId: number;
  createdAt: Date;
  updatedAt: Date;
}

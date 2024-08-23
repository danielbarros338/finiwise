export interface ExtraJobOption {
  description: string;
  installmentId: number|null;
}

export interface ExtraJob extends ExtraJobOption {
  extraJobId: number;
  earningId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ExtraJobOoption {
  description: string;
  installmentId: number|null;
}

export interface ExtraJob extends ExtraJobOoption {
  extraJobId: number;
  earningId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface EmployementCompensationOption {
  company: string;
}

export interface EmployementCompensation extends EmployementCompensationOption {
  employementCompensationId: number;
  earningId: number;
  createdAt: Date;
  updatedAt: Date;
}
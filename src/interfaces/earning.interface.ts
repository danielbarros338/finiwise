import { EmployementCompensationOption } from "./employementCompensation.interface";

export interface EarningReq {
  name: string;
  typeCode: string;
  userId: number;
  value: number;
  repeat: boolean;
  option: EmployementCompensationOption;
}

export interface Earning extends EarningReq {
  earningId: number;
  createdAt: Date;
  updatedAt: Date;
}

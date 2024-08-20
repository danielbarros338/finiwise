export interface EarningReq {
  name: string;
  typeId: number;
  userId: number;
  value: number;
  repeat: boolean;
}

export interface Earning extends EarningReq {
  earningId: number;
  createdAt: Date;
  updatedAt: Date;
}
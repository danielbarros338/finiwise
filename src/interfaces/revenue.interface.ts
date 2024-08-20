export interface RevenueReq {
  name: string;
  typeId: number;
  userId: number;
  levelId: number;
  value: number;
  repeat: boolean;
}

export interface Revenue extends RevenueReq {
  revenueId: number;
  createdAt: Date;
  updatedAt: Date;
}
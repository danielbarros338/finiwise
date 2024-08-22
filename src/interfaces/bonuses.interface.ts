export interface BonusesOption {
  description: string;
}

export interface Bonuses extends BonusesOption {
  bonusesId: number;
  earningId: number;
  createdAt: Date;
  updatedAt: Date;
}
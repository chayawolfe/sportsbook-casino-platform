export interface IBonusData {
    _id: string;
    autoCalc: boolean;
    banner: string;
    bonusCap: number;
    casino: boolean;
    createdAt: string;
    description: string;
    expireDate: string;
    isExpired: boolean;
    maxBet: number;
    minBet: number;
    multiply: number;
    name: string;
    option: string;
    percent: number;
    slot: boolean;
    status: boolean;
    updatedAt: string;
}

export type IPlayerBonus = {
    bonus: IBonusData;
    bonusId: string;
    createdAt: string;
    amount: number;
    goalAmount: number;
    processAmount: number;
    status: string;
    updatedAt: string;
    userId: string;
    _id: string;
};

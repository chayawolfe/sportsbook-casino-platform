export interface Itransaction {
    afterAmount: number;
    amount: number;
    beforeAmount: number;
    createdAt: string;
    currencyName: string;
    gameId: string;
    gameName: string;
    provider: string;
    relatedId: string;
    tnxId: string;
    type: string;
    typeDescription: string;
    updatedAt: string;
    user: {
        avatar: string;
        username: string;
    };
    userId: string;
}

export interface IWithdraw {
    _id: string;
    userId: string;
    currencyId: string;
    currency: string;
    amount: number;
    status: string;
    payoutType: string;
    gatewayOrderId: string;
    description: string;
    data: any;
    createdAt: string;
    updatedAt: string;
}

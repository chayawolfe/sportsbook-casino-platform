export interface IDeposit {
    _id: string;
    userId: string;
    currencyId: string;
    balanceId: string;
    currency: string;
    amount: number;
    actuallyAmount: number;
    status: string;
    payinType: string;
    description: string;
    gatewayOrderId: string;
    data: INowpayDeposit | any;
    createdAt: string;
    updatedAt: string;
}

export interface INowpayDeposit {
    network: string;
    pay_address: string;
    pay_amount: number;
    pay_currency: string;
}

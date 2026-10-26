export type providerType = {
    currency: string;
    game_type: string;
    product_code: number;
    product_id: number;
    product_title: string;
    provider: string;
    provider_id: number;
};

export type categoryType = {
    categoryCode: string;
    categoryName: string;
};

export type balanceType = {
    amount: number;
    pending: number;
    turnover: number;
    bonus: number;
    withdrawable: number;
    currency: string;
    icon: string;
};

export type ISport = {
    _id: string;
    provider: string;
    currency: string[];
    status: string;
    state: boolean;
    provider_id: number;
    product_id: number;
    product_code: number;
    game_type: string;
    product_title: string;
    order: number;
    createdAt: string;
    updatedAt: string;
};

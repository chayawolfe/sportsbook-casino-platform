import axios from 'utils/axios';

// Auth
export const updateUsername = async (username: string) => {
    const res = await axios.patch('/api/player/username', { username });
    return res.data;
};

export const updateAvatar = async (formData: FormData) => {
    const res = await axios.patch('/api/player/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return res.data;
};

export const updatePassword = async (data: any) => {
    const res = await axios.patch('/api/player/password', data);
    return res.data;
};

export const getKyc = async () => {
    const res = await axios.get('/api/player/kyc');
    return res.data;
};

export const personalVerify = async (data: FormData) => {
    const res = await axios.post('/api/player/kyc', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return res.data;
};

export const updatePreference = async (data: any) => {
    const res = await axios.patch('/api/preference', data);
    return res.data;
};

export const updateSelectedCurrency = async (currencyId: string) => {
    const res = await axios.patch('/api/player/currency', { currencyId });
    return res.data;
};

// Game
export const getProviderGameList = async (data: {
    gameType: string;
    productIds: number[];
    currentPage: number;
    perPage: number;
}) => {
    const res = await axios.post('/api/casino/games', data);
    return res.data;
};

export const getSports = async () => {
    const res = await axios.get(`/api/sport`);
    return res.data;
};

export const getGameDetails = async (gameCode: string) => {
    const res = await axios.get(`/api/casino/game-detail/${gameCode}`);
    return res.data;
};

export const gameLaunch = async (data: any) => {
    const res = await axios.post(`/api/casino/launch`, data);
    return res.data;
};

export const getProviderList = async (type: string) => {
    const res = await axios.post('/api/casino/provider', { gameType: type });

    return res.data;
};

export const getGamesBySearch = async (name: string, gameType: string, currentPage: number, perPage: number) => {
    const res = await axios.post('/api/casino/search', { name, gameType, currentPage, perPage });

    return res.data;
};

// Slot
export const getSlotGames = async (data: { currentPage: number; perPage: number; categoryCodes?: string[] }) => {
    const res = await axios.post('/api/casino/ag-games', data);

    return res.data;
};

export const getAgCategory = async () => {
    const res = await axios.get('/api/casino/ag-category');

    return res.data;
};

export const getAgGameDetails = async (gameCode: string) => {
    const res = await axios.get(`/api/casino/ag-game-detail/${gameCode}`);
    return res.data;
};

export const agGameLaunch = async (data: any) => {
    const res = await axios.post(`/api/casino/ag-launch`, data);
    return res.data;
};

// Payment
export const nowpayDeposit = async (amount: number, currency: string) => {
    const res = await axios.post('/api/nowpay/deposit', { amount, currency });
    return res.data;
};

export const getNowPaymentCurrencies = async () => {
    const res = await axios.get('/api/nowpay/currency');
    return res.data;
};

export const getCurrencyList = async () => {
    const res = await axios.get('/api/currency/list');
    return res.data;
};

export const getUserBalance = async () => {
    const res = await axios.get('/api/player/balance');

    return res.data;
};

// Withdraw api
export const getWithdrawCurrency = async (withdrawAmount: number, currencyCode: string) => {
    const res = await axios.post('/api/nowpay/get-withdraw-currency', { withdrawAmount, currencyCode });
    return res.data;
};

export const withdraw = async (
    fromCurrency: String,
    toCurrency: string,
    fromAmount: number,
    payoutType: string,
    address: string
) => {
    const res = await axios.post('/api/withdraw', { fromCurrency, toCurrency, fromAmount, payoutType, address });
    return res.data;
};

// histories
export const getTransactions = async (data: any) => {
    const res = await axios.post('/api/player/transaction', data);
    return res.data;
};

// bonus
export const getBonusList = async () => {
    const res = await axios.get('/api/bonus');

    return res.data;
};

export const getBonusById = async (id: string) => {
    const res = await axios.get(`/api/bonus/${id}`);

    return res.data;
};

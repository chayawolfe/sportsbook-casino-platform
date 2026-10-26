import axios from 'utils/axios';

export const paymentApi = {
    withdraw: async (data: any) => {
        const res = await axios.post('/api/withdraw', data);
        return res.data;
    },
    getWithdrawCurrency: async (withdrawAmount: number, currencyCode: string) => {
        const res = await axios.post('/api/nowpay/get-withdraw-currency', { withdrawAmount, currencyCode });
        return res.data;
    },
    getPendingDeposit: async () => {
        const res = await axios.get('/api/deposit/pending');
        return res.data;
    },
    cancelDeposit: async (data: any) => {
        const res = await axios.patch('/api/deposit/cancel', data);
        return res.data;
    },
    getDepositList: async (data: any) => {
        const res = await axios.post('/api/player/deposit', data);
        return res.data;
    },
    getPendingWithdraw: async () => {
        const res = await axios.get('/api/withdraw/pending');
        return res.data;
    },
    getWithdrawList: async (data: any) => {
        const res = await axios.post('/api/player/withdraw', data);
        return res.data;
    },
    agpaymentDeposit: async (data: any) => {
        const res = await axios.post('/api/ag-pay/deposit', data);
        return res.data;
    },
    agpaymentWithdraw: async (data: any) => {
        const res = await axios.post('/api/ag-pay/withdraw', data);
        return res.data;
    },
    gspaymentDeposit: async (data: any) => {
        const res = await axios.post('/api/gs-pay/deposit', data);
        return res.data;
    }
};

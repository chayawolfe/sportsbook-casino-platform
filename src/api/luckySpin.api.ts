import axios from 'utils/axios';

export const luckSpinApi = {
    getPrizes: async () => {
        const res = await axios.get('/api/vip-spin-prize/get-prize');
        return res.data;
    },
    getSpinData: async () => {
        const res = await axios.get('/api/vip-spin/ready');
        return res.data;
    },
    play: async () => {
        const res = await axios.get('/api/vip-spin/play');
        return res.data;
    },
    collect: async (data: any) => {
        const res = await axios.post('/api/vip-spin/collect', data);
        return res.data;
    },
    getStatistic: async () => {
        const res = await axios.get('/api/vip-spin/statistic');
        return res.data;
    },
    getWinners: async () => {
        const res = await axios.get('/api/vip-spin/winners');
        return res.data;
    }
};

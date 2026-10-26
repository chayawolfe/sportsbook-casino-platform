import axios from 'utils/axios';

type IGetBonusList = { status: string; currentPage: number; rowsPerPage: number; date?: { start: Date; end: Date } };

export const bonusApi = {
    getBonusList: async (data: IGetBonusList) => {
        const res = await axios.post('/api/player/bonus', data);
        return res.data;
    },
    claimBonus: async (bonusId: string) => {
        const res = await axios.get(`/api/player/bonus/${bonusId}/claim`);
        return res.data;
    },
    checkVIPBonus: async () => {
        const res = await axios.get(`/api/player/bonus/active-vip-bonus`);
        return res.data;
    },
    claimVipBonus: async (data: any) => {
        const res = await axios.post(`/api/player/bonus/claim-vip-bonus`, data);
        return res.data;
    }
};

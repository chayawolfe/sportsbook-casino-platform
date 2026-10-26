import axios from 'utils/axios';

export const settingApi = {
    getDefaulData: async () => {
        const res = await axios.get('/api/setting/site');
        return res.data;
    },
    getHelps: async (lang: string) => {
        const res = await axios.get(`/api/help?lang=${lang}`);
        return res.data;
    },
    getVips: async () => {
        const res = await axios.get(`/api/vip-level/list`);
        return res.data;
    }
};

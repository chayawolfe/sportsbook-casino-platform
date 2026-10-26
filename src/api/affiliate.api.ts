import axios from 'utils/axios';

export const affiliateApi = {
    generateReferralCode: async (name: string) => {
        const response = await axios.post(`/api/referral-code`, { name });
        return response.data;
    },
    getReferralCode: async () => {
        const response = await axios.get(`/api/referral-code`);
        return response.data;
    },
    getReferralStatus: async () => {
        const response = await axios.get(`/api/referral-code/status`);
        return response.data;
    },
    getRewardStatus: async () => {
        const response = await axios.get(`/api/reward/status`);
        return response.data;
    },
    getRewardLog: async (data: any) => {
        const response = await axios.post(`/api/reward/get-log`, data);
        return response.data;
    },
    getRewardDashboard: async () => {
        const response = await axios.get(`/api/reward/dashboard`);
        return response.data;
    },
    getReferralActivity: async () => {
        const response = await axios.get(`/api/reward/activity`);
        return response.data;
    },
    getReferralFriends: async (page: number, limit: number) => {
        const response = await axios.get(`/referral/friends?page=${page}&limit=${limit}`);
        return response.data;
    },
    getBannerImage: async (lang: string, key: string) => {
        const response = await axios.get(`/website-settings?language=${lang}&key=${key}`);
        return response.data;
    },
    getRewards: async () => {
        const response = await axios.get(`/referral/rewards`);
        return response.data;
    },
    getAvailablePrizes: async () => {
        const response = await axios.get(`/referral/available-prizes`);
        return response.data;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPrizes: async (params: any) => {
        const response = await axios.get(`/referral/prizes`, {
            params
        });
        return response.data;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    convert: async (data: any) => {
        const response = await axios.post(`/api/reward/convert`, data);
        return response.data;
    },
    getSummary: async () => {
        const response = await axios.get(`/referral/summary`);
        return response.data;
    }
};

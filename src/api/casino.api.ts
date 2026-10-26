import axios from 'utils/axios';

export const casinoApi = {
    getRecommendGames: async () => {
        const res = await axios.get('/api/casino/recommend');
        return res.data;
    },
    getRecentBigWin: async () => {
        const res = await axios.get('/api/casino/recent-big-win');
        return res.data;
    }
};

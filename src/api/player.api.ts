import axios from 'utils/axios';

export const playerApi = {
    getPlayerGames: async () => {
        const res = await axios.get('/api/player/my-games');
        return res.data;
    },
    getPlayerStatistics: async (category: string) => {
        const res = await axios.get(`/api/player/statistics?category=${category}`);
        return res.data;
    }
};

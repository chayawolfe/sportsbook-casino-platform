import axios from 'utils/axios';

export const notificationApi = {
    getNotifications: async () => {
        const res = await axios.get(`/api/notification`);
        return res.data;
    },
    readNotification: async (notificationId: string) => {
        const res = await axios.patch(`/api/notification/read/${notificationId}`);
        return res.data;
    },
    deleteNotification: async (notificationId: string) => {
        const res = await axios.patch(`/api/notification/delete/${notificationId}`);
        return res.data;
    }
};

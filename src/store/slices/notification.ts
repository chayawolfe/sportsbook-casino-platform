import { createSlice } from '@reduxjs/toolkit';
import { notificationType } from 'types/notification';

// ----------------------------------------------------------------------

const initialState: {
    count: number;
    promotionsCount: number;
    transactionsCount: number;
    systemCount: number;
    promotions: notificationType[];
    transactions: notificationType[];
    system: notificationType[];
} = {
    promotions: [],
    transactions: [],
    system: [],
    count: 0,
    promotionsCount: 0,
    transactionsCount: 0,
    systemCount: 0
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification(state, action) {
            const promotions = action.payload.filter((n: notificationType) => n.category === 'promotions');
            state.promotions = promotions;
            state.promotionsCount = promotions.filter((n: notificationType) => !n.isRead).length;

            const transactions = action.payload.filter((n: notificationType) => n.category === 'transactions');
            state.transactions = transactions;
            state.transactionsCount = transactions.filter((n: notificationType) => !n.isRead).length;

            const system = action.payload.filter((n: notificationType) => n.category === 'system');
            state.system = system;
            state.systemCount = system.filter((n: notificationType) => !n.isRead).length;

            state.count = action.payload.filter((n: notificationType) => !n.isRead).length;
        },
        readNotification(state, action) {
            const { id, data, category } = action.payload;
            if (category === 'promotions') {
                state.promotions = state.promotions.map((item) => (item._id === id ? { ...item, ...data } : item));
                state.promotionsCount = state.promotionsCount === 0 ? 0 : state.promotionsCount - 1;
            } else if (category === 'transactions') {
                state.transactions = state.transactions.map((item) => (item._id === id ? { ...item, ...data } : item));
                state.transactionsCount = state.transactionsCount === 0 ? 0 : state.transactionsCount - 1;
            } else if (category === 'system') {
                state.system = state.system.map((item) => (item._id === id ? { ...item, ...data } : item));
                state.systemCount = state.systemCount === 0 ? 0 : state.systemCount - 1;
            }
            state.count = state.count === 0 ? 0 : state.count - 1;
        },
        deleteNotification(state, action) {
            const { id, category } = action.payload;
            if (category === 'promotions') {
                state.promotions = state.promotions.filter((item) => item._id !== id);
                state.promotionsCount = state.promotionsCount === 0 ? 0 : state.promotionsCount - 1;
            } else if (category === 'transactions') {
                state.transactions = state.transactions.filter((item) => item._id !== id);
                state.transactionsCount = state.transactionsCount === 0 ? 0 : state.transactionsCount - 1;
            } else if (category === 'system') {
                state.system = state.system.filter((item) => item._id !== id);
                state.systemCount = state.systemCount === 0 ? 0 : state.systemCount - 1;
            }
            state.count = state.count === 0 ? 0 : state.count - 1;
        }
    }
});

export const { updateNotification, readNotification, deleteNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

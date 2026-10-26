import { createSlice } from '@reduxjs/toolkit';
import { balanceType } from 'types/game';

// ----------------------------------------------------------------------

const initialState: balanceType = {
    amount: 0,
    pending: 0,
    bonus: 0,
    turnover: 0,
    withdrawable: 0,
    currency: '',
    icon: ''
};

const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        balanceAction(state, action) {
            state.amount = action.payload.amount;
            state.bonus = action.payload.bonus;
            state.pending = action.payload.pending;
            state.turnover = action.payload.turnover;
            state.withdrawable = action.payload.withdrawable;
            state.currency = action.payload.currency;
            state.icon = action.payload.icon;
        },
        updateBalance(state, action) {
            state.amount = action.payload.amount;
            state.bonus = action.payload.bonus;
            state.pending = action.payload.pending;
            state.turnover = action.payload.turnover;
            state.withdrawable = action.payload.withdrawable;
        }
    }
});

export const { balanceAction, updateBalance } = balanceSlice.actions;
// Reducer
export default balanceSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState: any = {
    categories: [],
    casinoData: {}
};

const casinoSlice = createSlice({
    name: 'casino',
    initialState,
    reducers: {
        setCasinoCategory(state, action) {
            state.categories = action.payload;
        },
        setCasinoData(state, action) {
            state.casinoData = { ...state.casinoData, ...action.payload };
        }
    }
});

export const { setCasinoCategory, setCasinoData } = casinoSlice.actions;
// Reducer
export default casinoSlice.reducer;

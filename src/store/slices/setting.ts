import { createSlice } from '@reduxjs/toolkit';
import { ISite } from 'types/site';

// ----------------------------------------------------------------------

const initialState: ISite = {
    currencies: [],
    cryptoCurrencies: {},
    banners: [],
    recommendGames: [],
    sportList: []
};

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        updateDeafultData(state, action) {
            state.currencies = action.payload.currencies;
            state.cryptoCurrencies = action.payload.cryptoCurrencies;
            state.banners = action.payload.banners;
        },
        updateCurrency(state, action) {
            state.currencies = action.payload.currencies;
        },
        updateCryptoCurrency(state, action) {
            state.cryptoCurrencies = action.payload.cryptoCurrencies;
        },
        updateBanner(state, action) {
            state.banners = action.payload.banners;
        },
        updateRecommendGames(state, action) {
            state.recommendGames = action.payload;
        },
        updateSport(state, action) {
            state.sportList = action.payload;
        }
    }
});

export const {
    updateCurrency,
    updateCryptoCurrency,
    updateBanner,
    updateDeafultData,
    updateRecommendGames,
    updateSport
} = settingSlice.actions;

export default settingSlice.reducer;

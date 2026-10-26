import { createSlice } from '@reduxjs/toolkit';
import { IPreference, IUserState } from 'types/user';

// ----------------------------------------------------------------------

const initialState: IUserState = {
    authLoading: true,
    isLogined: false,
    user: null,
    preference: null,
    language: 'en',
    accessToken: '',
    blockList: [],
    stakes: [],
    disabledMatch: []
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAction(state, action) {
            state.isLogined = true;
            state.authLoading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        preferenceAction(state, action) {
            state.preference = action.payload;
        },
        updatePreferenceAction(state, action) {
            if (state.preference)
                state.preference = {
                    ...state.preference,
                    [action.payload.name]: action.payload.value
                };
        },
        languageAction(state, action) {
            localStorage.setItem('lang', action.payload);
            state.language = action.payload;
        },
        balanceAction(state, action) {},
        logoutAction(state) {
            state.isLogined = false;
            state.authLoading = false;
            state.user = null;
            state.stakes = [];
            state.accessToken = '';
        },
        updateUserAction(state, action) {
            state.user = { ...state.user, ...action.payload };
        },
        updateStakesAction(state, action) {
            state.stakes = action.payload;
        },
        updateSportsBlock(state, action) {
            state.blockList = action.payload;
        }
    }
});

export const {
    loginAction,
    logoutAction,
    preferenceAction,
    updatePreferenceAction,
    languageAction,
    updateSportsBlock,
    updateStakesAction,
    updateUserAction
} = authSlice.actions;

export default authSlice.reducer;

import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/auth';
import casinoReducer from './slices/casino';
import balanceReducer from './slices/balance';
import settingReducer from './slices/setting';
import notificationReducer from './slices/notification';

export const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: []
};

const rootReducer = combineReducers({
    auth: authReducer,
    casino: casinoReducer,
    balance: balanceReducer,
    setting: settingReducer,
    notification: notificationReducer
});

export default rootReducer;

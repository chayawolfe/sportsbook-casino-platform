import { createContext } from 'react';
import { ICryptoCurrency } from 'types/user';

export type RegisterValue = {
    email: string;
    username: string;
    password: string;
    currencyId: string;
    inviteCode: string;
};

export type AuthContextValue = {
    authLoading: boolean;
    isLogined: boolean;
    accessToken: string;
    user: any;
    currencies: any;
    cryptoCurrencies: { [key: string]: ICryptoCurrency[] };
    preference: any;
    language: string;
    login: (username: string, password: string, remember: boolean) => Promise<void>;
    updateUser: (params: any) => Promise<void>;
    register: (registerValue: RegisterValue) => Promise<void>;
    setLanguage: (value: string) => Promise<void>;
    updatePreferenceData: (name: string, value: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export { AuthContext };

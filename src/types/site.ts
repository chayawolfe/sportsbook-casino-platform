import { ISport } from './game';
import { ICryptoCurrency, ICurrency } from './user';

export interface ISite {
    currencies: [] | ICurrency[];
    cryptoCurrencies: { [key: string]: ICryptoCurrency[] };
    banners: { image: string; order: number }[];
    recommendGames: any[];
    sportList: ISport[];
}

export interface IVip {
    _id: string;
    levelName: string;
    xp: number;
    tiersName: string;
    icon: string;
}

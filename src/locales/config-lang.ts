'use client';

import merge from 'lodash/merge';
// date fns
import {
    fr as frFRAdapter,
    vi as viVNAdapter,
    enUS as enUSAdapter,
    zhCN as zhCNAdapter,
    arSA as arSAAdapter,
    pt as ptSAAdapter
} from 'date-fns/locale';

// date pickers (MUI)
import { enUS as enUSDate, frFR as frFRDate, viVN as viVNDate, zhCN as zhCNDate } from '@mui/x-date-pickers/locales';
// core (MUI)
import {
    enUS as enUSCore,
    frFR as frFRCore,
    viVN as viVNCore,
    zhCN as zhCNCore,
    arSA as arSACore,
    ptBR as ptBRCore
} from '@mui/material/locale';
// data grid (MUI)
import {
    enUS as enUSDataGrid,
    frFR as frFRDataGrid,
    viVN as viVNDataGrid,
    zhCN as zhCNDataGrid,
    arSD as arSDDataGrid,
    ptBR as ptBRDataGrid
} from '@mui/x-data-grid/locales';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
    {
        label: 'English',
        value: 'en',
        systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
        adapterLocale: enUSAdapter,
        icon: 'flagpack:gb-nir',
        numberFormat: {
            code: 'en-US',
            currency: 'USD'
        }
    },
    {
        label: 'French',
        value: 'fr',
        systemValue: merge(frFRDate, frFRDataGrid, frFRCore),
        adapterLocale: frFRAdapter,
        icon: 'flagpack:fr',
        numberFormat: {
            code: 'fr-Fr',
            currency: 'EUR'
        }
    },
    {
        label: 'Vietnamese',
        value: 'vi',
        systemValue: merge(viVNDate, viVNDataGrid, viVNCore),
        adapterLocale: viVNAdapter,
        icon: 'flagpack:vn',
        numberFormat: {
            code: 'vi-VN',
            currency: 'VND'
        }
    },
    {
        label: 'Chinese',
        value: 'cn',
        systemValue: merge(zhCNDate, zhCNDataGrid, zhCNCore),
        adapterLocale: zhCNAdapter,
        icon: 'flagpack:cn',
        numberFormat: {
            code: 'zh-CN',
            currency: 'CNY'
        }
    },
    {
        label: 'Arabic',
        value: 'ar',
        systemValue: merge(arSDDataGrid, arSACore),
        adapterLocale: arSAAdapter,
        icon: 'flagpack:sa',
        numberFormat: {
            code: 'ar',
            currency: 'AED'
        }
    },
    {
        label: 'Portuguese',
        value: 'pt',
        systemValue: merge(ptBRDataGrid, ptBRCore),
        adapterLocale: ptSAAdapter,
        icon: 'flagpack:sa',
        numberFormat: {
            code: 'pt-BR',
            currency: 'BRL'
        }
    }
];

export const defaultLang = allLangs[0]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0

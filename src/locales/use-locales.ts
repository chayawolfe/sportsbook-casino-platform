'use client';

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { localStorageGetItem } from 'utils/storage-available';

import { useSettingsContext } from 'components/settings';

import { allLangs, defaultLang } from './config-lang';

// ----------------------------------------------------------------------

export function useLocales() {
    const langStorage = localStorageGetItem('i18nextLng');

    const currentLang = allLangs.find((lang) => lang.value === langStorage) || defaultLang;

    return {
        allLangs,
        currentLang
    };
}

// ----------------------------------------------------------------------

export function useTranslate() {
    const { t, i18n, ready } = useTranslation();

    const settings = useSettingsContext();

    const onChangeLang = useCallback(
        (newlang: string) => {
            i18n.changeLanguage(newlang);
            settings.onChangeDirectionByLang(newlang);
        },
        [i18n, settings]
    );

    return {
        t,
        i18n,
        ready,
        onChangeLang
    };
}

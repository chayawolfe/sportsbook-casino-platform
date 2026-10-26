'use client';

import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';

import { useLocalStorage } from 'hooks/use-local-storage';

import { localStorageGetItem } from 'utils/storage-available';

import { IModalType, SettingsValueProps } from '../types';
import { SettingsContext } from './settings-context';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'settings';

type SettingsProviderProps = {
    children: React.ReactNode;
    defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
    const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [modal, setModal] = useState('');

    const isArabic = localStorageGetItem('i18nextLng') === 'ar';

    useEffect(() => {
        if (isArabic) {
            onChangeDirectionByLang('ar');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isArabic]);

    // Direction by lang
    const onChangeDirectionByLang = useCallback(
        (lang: string) => {
            update('themeDirection', lang === 'ar' ? 'rtl' : 'ltr');
        },
        [update]
    );

    // Drawer
    const onToggleDrawer = useCallback(() => {
        setOpenDrawer((prev) => !prev);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setOpenDrawer(false);
    }, []);

    // Modal
    const onToggleModal = useCallback((str: IModalType) => {
        setModal(str);
    }, []);

    const canReset = !isEqual(state, defaultSettings);

    const memoizedValue = useMemo(
        () => ({
            ...state,
            onUpdate: update,
            // Direction
            onChangeDirectionByLang,
            // Reset
            canReset,
            onReset: reset,
            // Drawer
            open: openDrawer,
            onToggle: onToggleDrawer,
            onClose: onCloseDrawer,
            // Modal
            modal,
            onToggleModal
        }),
        [
            reset,
            update,
            state,
            modal,
            canReset,
            openDrawer,
            onToggleModal,
            onCloseDrawer,
            onToggleDrawer,
            onChangeDirectionByLang
        ]
    );

    return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}

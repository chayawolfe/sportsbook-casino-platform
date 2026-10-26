'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { localStorageGetItem } from 'utils/storage-available';

import { defaultLang } from './config-lang';
import translationEn from './langs/en.json';
import translationFr from './langs/fr.json';
import translationVi from './langs/vi.json';
import translationCn from './langs/cn.json';
import translationAr from './langs/ar.json';
import translationPt from './langs/pt.json';

// ----------------------------------------------------------------------

const lng = localStorageGetItem('i18nextLng', defaultLang.value);

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translations: translationEn },
            fr: { translations: translationFr },
            vi: { translations: translationVi },
            cn: { translations: translationCn },
            ar: { translations: translationAr },
            pt: { translations: translationPt }
        },
        lng,
        fallbackLng: 'en',
        debug: false,
        ns: ['translations'],
        defaultNS: 'translations',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;

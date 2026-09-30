import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import hiCommon from './locales/hi/common.json';
import bnCommon from './locales/bn/common.json';
import mrCommon from './locales/mr/common.json';
import teCommon from './locales/te/common.json';
import taCommon from './locales/ta/common.json';
import guCommon from './locales/gu/common.json';
import knCommon from './locales/kn/common.json';
import mlCommon from './locales/ml/common.json';
import paCommon from './locales/pa/common.json';
import orCommon from './locales/or/common.json';
import asCommon from './locales/as/common.json';

const STORAGE_KEYS = ['sakhi-language', 'sakhi_cycle_lang_v1'];

const customDetectorOptions = {
  order: ['localStorage', 'navigator'],
  lookupLocalStorage: 'sakhi-language',
  caches: ['localStorage'],
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      hi: { common: hiCommon },
      bn: { common: bnCommon },
      mr: { common: mrCommon },
      te: { common: teCommon },
      ta: { common: taCommon },
      gu: { common: guCommon },
      kn: { common: knCommon },
      ml: { common: mlCommon },
      pa: { common: paCommon },
      or: { common: orCommon },
      as: { common: asCommon },
    },
    defaultNS: 'common',
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'bn', 'mr', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'or', 'as'],
    detection: customDetectorOptions,
    interpolation: {
      escapeValue: false, // React escapes values automatically
    },
    react: {
      useSuspense: false,
    },
  });

// Synchronize language preference in localStorage & document HTML lang tag
i18n.on('languageChanged', (lng) => {
  try {
    STORAGE_KEYS.forEach((key) => {
      localStorage.setItem(key, lng);
    });
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lng;
    }
  } catch (e) {
    console.error('Failed to persist language setting:', e);
  }
});

export default i18n;

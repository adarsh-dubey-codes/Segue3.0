import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import hiCommon from './locales/hi/common.json';
import mrCommon from './locales/mr/common.json';

const STORAGE_KEYS = ['sakhi-language', 'sakhi_cycle_lang_v1'];

// Custom Language Detector / Sync options
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
      mr: { common: mrCommon },
    },
    defaultNS: 'common',
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'mr'],
    detection: customDetectorOptions,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

// Synchronize language preference in localStorage
i18n.on('languageChanged', (lng) => {
  try {
    STORAGE_KEYS.forEach((key) => {
      localStorage.setItem(key, lng);
    });
    // Set html lang attribute
    document.documentElement.lang = lng;
  } catch (e) {
    console.error('Failed to persist language setting:', e);
  }
});

export default i18n;

import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';

const LanguageContext = createContext(null);

export const LANGUAGES = {
  en: { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  hi: { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  bn: { code: 'bn', label: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  mr: { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  te: { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  ta: { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  gu: { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  kn: { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  ml: { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  pa: { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  or: { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  as: { code: 'as', label: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' }
};

export const LanguageProvider = ({ children }) => {
  const { t, i18n: i18nInstance } = useTranslation('common');

  const currentLanguage = i18nInstance.language || 'en';

  const setLanguage = (langCode) => {
    if (LANGUAGES[langCode]) {
      i18nInstance.changeLanguage(langCode);
      try {
        localStorage.setItem('sakhi-language', langCode);
        localStorage.setItem('sakhi_cycle_lang_v1', langCode);
      } catch (e) {
        console.error('Error saving language:', e);
      }
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language: currentLanguage, 
        setLanguage, 
        t, 
        LANGUAGES,
        i18n: i18nInstance 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';

const LanguageContext = createContext(null);

export const LANGUAGES = {
  en: { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  hi: { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  mr: { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳' }
};

export const LanguageProvider = ({ children }) => {
  const { t, i18n: i18nInstance } = useTranslation('common');

  const currentLanguage = i18nInstance.language || 'en';

  const setLanguage = (langCode) => {
    if (LANGUAGES[langCode]) {
      i18nInstance.changeLanguage(langCode);
    }
  };

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
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

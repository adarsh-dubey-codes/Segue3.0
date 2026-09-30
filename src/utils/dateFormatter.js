/**
 * Helper utility for locale-aware Date and Number formatting across Sakhi Cycle.
 */

const LOCALE_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
};

export function formatDate(dateInput, language = 'en', options = {}) {
  if (!dateInput) return '';
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const locale = LOCALE_MAP[language] || 'en-IN';
  const defaultOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
  } catch (e) {
    return date.toLocaleDateString();
  }
}

export function formatNumber(num, language = 'en') {
  if (num === null || num === undefined) return '';
  const locale = LOCALE_MAP[language] || 'en-IN';
  try {
    return new Intl.NumberFormat(locale).format(num);
  } catch (e) {
    return String(num);
  }
}

/**
 * Data Storage Service for Sakhi Cycle V1
 * Decoupled data layer using localStorage.
 * Easily replaceable with a backend API in future iterations.
 */

const STORAGE_KEY_PERIOD_START = 'sakhi_period_start_date';
const STORAGE_KEY_USER_AUTH = 'sakhi_user_session';

export const getStoredPeriodStartDate = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PERIOD_START);
    return data ? new Date(data) : null;
  } catch (err) {
    console.error('Failed to read period start date from storage', err);
    return null;
  }
};

export const savePeriodStartDate = (date) => {
  try {
    if (!date) {
      localStorage.removeItem(STORAGE_KEY_PERIOD_START);
      return;
    }
    const isoString = date instanceof Date ? date.toISOString() : new Date(date).toISOString();
    localStorage.setItem(STORAGE_KEY_PERIOD_START, isoString);
  } catch (err) {
    console.error('Failed to save period start date to storage', err);
  }
};

export const getStoredUserSession = () => {
  try {
    const session = localStorage.getItem(STORAGE_KEY_USER_AUTH);
    return session ? JSON.parse(session) : null;
  } catch (err) {
    console.error('Failed to read user session', err);
    return null;
  }
};

export const saveUserSession = (userData) => {
  try {
    if (!userData) {
      localStorage.removeItem(STORAGE_KEY_USER_AUTH);
      return;
    }
    localStorage.setItem(STORAGE_KEY_USER_AUTH, JSON.stringify(userData));
  } catch (err) {
    console.error('Failed to save user session', err);
  }
};

export const clearUserSession = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_USER_AUTH);
  } catch (err) {
    console.error('Failed to clear user session', err);
  }
};

/**
 * Calculate cycle day based on start date
 */
export const calculateCycleDay = (startDate) => {
  if (!startDate) return null;
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = today - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // If period start date is today, it's Cycle Day 1
  // If period start date is N days ago, it's Cycle Day N + 1
  return diffDays >= 0 ? diffDays + 1 : 1;
};

/**
 * Format date for editorial display: e.g. "September 24" or "24 September"
 */
export const formatEditorialDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric'
  }).format(d);
};

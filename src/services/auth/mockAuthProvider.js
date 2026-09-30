/**
 * Development & Mock Auth Provider Driver
 * 
 * Implements the AuthService driver contract for client-side development.
 * Isolates mock authentication logic so it can be swapped out cleanly
 * for Supabase, Firebase, or custom backend services later.
 * 
 * Security Note: Does NOT store plaintext passwords.
 */

import { AUTH_MODES } from '../../types/auth';

const SESSION_STORAGE_KEY = 'sakhi_cycle_user_session_v3';

export const mockAuthProvider = {
  /**
   * Restores existing active session from storage
   * @returns {Promise<{ user: import('../../types/auth').AuthUser | null, mode: string }>}
   */
  async getCurrentSession() {
    await delay(300);
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return { user: null, mode: AUTH_MODES.UNAUTHENTICATED };
      const session = JSON.parse(raw);
      return {
        user: session.user,
        mode: session.mode || (session.user?.isGuest ? AUTH_MODES.GUEST : AUTH_MODES.AUTHENTICATED)
      };
    } catch (e) {
      console.error('Failed to restore session:', e);
      return { user: null, mode: AUTH_MODES.UNAUTHENTICATED };
    }
  },

  /**
   * Authenticate user with email and password
   */
  async login({ email, password }) {
    await delay(800);

    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    if (!isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // Demo check: Reject invalid email if needed, otherwise generate valid session
    const nameFromEmail = email.split('@')[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const user = {
      id: `usr_${Date.now()}`,
      name: formattedName,
      email: email.toLowerCase().trim(),
      mode: AUTH_MODES.AUTHENTICATED,
      isGuest: false,
      createdAt: new Date().toISOString()
    };

    const sessionData = { user, mode: AUTH_MODES.AUTHENTICATED, token: `mock_jwt_${Date.now()}` };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));

    return { success: true, user, token: sessionData.token };
  },

  /**
   * Register a new user account
   */
  async signup({ name, email, password }) {
    await delay(900);

    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    if (!isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    const displayName = name && name.trim() ? name.trim() : email.split('@')[0];

    const user = {
      id: `usr_${Date.now()}`,
      name: displayName,
      email: email.toLowerCase().trim(),
      mode: AUTH_MODES.AUTHENTICATED,
      isGuest: false,
      createdAt: new Date().toISOString()
    };

    const sessionData = { user, mode: AUTH_MODES.AUTHENTICATED, token: `mock_jwt_${Date.now()}` };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));

    return { success: true, user, token: sessionData.token };
  },

  /**
   * Enter application in device-local Guest Mode
   */
  async continueAsGuest() {
    await delay(400);

    const guestUser = {
      id: `guest_${Date.now()}`,
      name: 'Guest Companion',
      email: '',
      mode: AUTH_MODES.GUEST,
      isGuest: true,
      createdAt: new Date().toISOString()
    };

    const sessionData = { user: guestUser, mode: AUTH_MODES.GUEST, token: null };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));

    return { success: true, user: guestUser };
  },

  /**
   * Terminate current session
   */
  async logout() {
    await delay(300);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return { success: true };
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

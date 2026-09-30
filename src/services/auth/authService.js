/**
 * Centralized Authentication Service Abstraction
 * 
 * decouples the UI layer from specific authentication providers (Supabase, Firebase, custom backend).
 * To switch providers in the future, simply update activeProvider below or inject a new provider driver.
 */

import { supabaseAuthProvider } from './supabaseAuthProvider';

// Active driver provider (easily replaced with Supabase / Firebase / Custom REST Auth)
const activeProvider = supabaseAuthProvider;

export const authService = {
  /**
   * Get current session state on initial app load
   */
  async getCurrentSession() {
    return activeProvider.getCurrentSession();
  },

  /**
   * Log in user
   * @param {{ email: string, password: string }} credentials
   */
  async login(credentials) {
    return activeProvider.login(credentials);
  },

  /**
   * Register new account
   * @param {{ name?: string, email: string, password: string }} credentials
   */
  async signup(credentials) {
    return activeProvider.signup(credentials);
  },

  /**
   * Enter application in Guest Mode
   */
  async continueAsGuest() {
    return activeProvider.continueAsGuest();
  },

  /**
   * End session
   */
  async logout() {
    return activeProvider.logout();
  },

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    return activeProvider.resetPassword(email);
  },

  /**
   * Update password for authenticated user
   */
  async updatePassword(newPassword) {
    return activeProvider.updatePassword(newPassword);
  }
};


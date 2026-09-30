/**
 * Sakhi Cycle Authentication System Types & Constants
 * 
 * Centralized definition of authentication states, roles, and provider interface.
 */

export const AUTH_MODES = {
  AUTHENTICATED: 'authenticated',
  GUEST: 'guest',
  UNAUTHENTICATED: 'unauthenticated',
};

/**
 * @typedef {'authenticated' | 'guest' | 'unauthenticated'} AuthMode
 */

/**
 * @typedef {Object} AuthUser
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {AuthMode} mode
 * @property {boolean} isGuest
 * @property {string} [createdAt]
 */

/**
 * @typedef {Object} AuthResult
 * @property {boolean} success
 * @property {AuthUser} [user]
 * @property {string} [error]
 * @property {string} [token]
 */

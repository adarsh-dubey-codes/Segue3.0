import { supabase } from '../../lib/supabase';
import { AUTH_MODES } from '../../types/auth';

const GUEST_STORAGE_KEY = 'sakhi_cycle_guest_session';

export const supabaseAuthProvider = {
  /**
   * Get current active session from Supabase Auth or Guest localStorage
   */
  async getCurrentSession() {
    try {
      // 1. Check Supabase Auth active session first
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.warn('[Supabase Auth] Get session notice:', error.message);
      }

      if (session && session.user) {
        const user = mapSupabaseUser(session.user);
        return { user, mode: AUTH_MODES.AUTHENTICATED, session };
      }

      // 2. Fallback check for local device Guest Mode
      const guestRaw = localStorage.getItem(GUEST_STORAGE_KEY);
      if (guestRaw) {
        try {
          const guestUser = JSON.parse(guestRaw);
          return { user: guestUser, mode: AUTH_MODES.GUEST, session: null };
        } catch (e) {
          localStorage.removeItem(GUEST_STORAGE_KEY);
        }
      }

      return { user: null, mode: AUTH_MODES.UNAUTHENTICATED, session: null };
    } catch (err) {
      console.error('[Supabase Auth] Unexpected session error:', err);
      return { user: null, mode: AUTH_MODES.UNAUTHENTICATED, session: null };
    }
  },

  /**
   * Sign in with Email & Password
   */
  async login({ email, password }) {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    try {
      // Clear any guest session on sign in
      localStorage.removeItem(GUEST_STORAGE_KEY);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        return { success: false, error: mapAuthError(error) };
      }

      const user = mapSupabaseUser(data.user);
      return { success: true, user, session: data.session };
    } catch (err) {
      return { success: false, error: 'An unexpected error occurred during sign in.' };
    }
  },

  /**
   * Sign up new user account with Supabase Auth
   */
  async signup({ name, email, password }) {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    try {
      // Clear guest session
      localStorage.removeItem(GUEST_STORAGE_KEY);

      const displayName = name && name.trim() ? name.trim() : email.split('@')[0];

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: displayName,
            name: displayName
          }
        }
      });

      if (error) {
        return { success: false, error: mapAuthError(error) };
      }

      const user = mapSupabaseUser(data.user, displayName);
      return { success: true, user, session: data.session };
    } catch (err) {
      return { success: false, error: 'Could not create account. Please try again.' };
    }
  },

  /**
   * Request password reset email
   */
  async resetPassword(email) {
    if (!email) return { success: false, error: 'Email is required.' };

    try {
      const redirectTo = `${window.location.origin}/login`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo
      });

      if (error) {
        return { success: false, error: mapAuthError(error) };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to send password reset email.' };
    }
  },

  /**
   * Update authenticated user's password
   */
  async updatePassword(newPassword) {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        return { success: false, error: mapAuthError(error) };
      }
      return { success: true, user: mapSupabaseUser(data.user) };
    } catch (err) {
      return { success: false, error: 'Failed to update password.' };
    }
  },

  /**
   * Continue as Guest on device
   */
  async continueAsGuest() {
    // Clear Supabase session if any
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Ignore
    }

    const guestUser = {
      id: `guest_${Date.now()}`,
      name: 'Guest Companion',
      email: '',
      mode: AUTH_MODES.GUEST,
      isGuest: true,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guestUser));
    return { success: true, user: guestUser };
  },

  /**
   * Sign out of session
   */
  async logout() {
    try {
      localStorage.removeItem(GUEST_STORAGE_KEY);
      await supabase.auth.signOut();
    } catch (err) {
      console.error('[Supabase Auth] Logout error:', err);
    }
    return { success: true };
  }
};

/**
 * Map Supabase auth user object to application AuthUser type
 */
function mapSupabaseUser(sbUser, fallbackName = '') {
  if (!sbUser) return null;
  const meta = sbUser.user_metadata || {};
  const nameFromEmail = sbUser.email ? sbUser.email.split('@')[0] : 'Companion';
  const displayName = meta.full_name || meta.name || fallbackName || (nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));

  return {
    id: sbUser.id,
    name: displayName,
    email: sbUser.email || '',
    mode: AUTH_MODES.AUTHENTICATED,
    isGuest: false,
    createdAt: sbUser.created_at || new Date().toISOString()
  };
}

/**
 * Friendly error message mapper (Phase 18)
 */
function mapAuthError(error) {
  if (!error) return 'An unexpected error occurred.';
  const msg = error.message ? error.message.toLowerCase() : '';

  if (msg.includes('email not confirmed')) {
    return 'Please check your email inbox and confirm your account before signing in.';
  }
  if (msg.includes('invalid login credentials') || msg.includes('invalid_grant')) {
    return 'Invalid email or password. Please try again.';
  }
  if (msg.includes('user already registered') || msg.includes('already exists')) {
    return 'An account with this email address already exists.';
  }
  if (msg.includes('password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (msg.includes('rate limit') || msg.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  if (msg.includes('failed to fetch') || msg.includes('networkerror')) {
    return 'Unable to reach server. Please restart your Vite dev server (npm run dev) so the newly updated .env environment variables are loaded by Vite.';
  }
  return error.message || 'Authentication error. Please try again.';
}


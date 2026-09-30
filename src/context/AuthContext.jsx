import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth/authService';
import { profileService } from '../services/profile.service';
import { supabase } from '../lib/supabase';
import { AUTH_MODES } from '../types/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [authMode, setAuthMode] = useState(AUTH_MODES.UNAUTHENTICATED);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return;
    }
    const userProfile = await profileService.getCurrentProfile(userId);
    setProfile(userProfile);
  };

  // Restore initial session on mount and subscribe to onAuthStateChange
  useEffect(() => {
    let isMounted = true;

    async function initSession() {
      try {
        const { user: restoredUser, mode } = await authService.getCurrentSession();
        if (isMounted) {
          if (restoredUser && mode !== AUTH_MODES.UNAUTHENTICATED) {
            setUser(restoredUser);
            setAuthMode(mode);
            if (mode === AUTH_MODES.AUTHENTICATED) {
              await loadUserProfile(restoredUser.id);
            }
          } else {
            setUser(null);
            setProfile(null);
            setAuthMode(AUTH_MODES.UNAUTHENTICATED);
          }
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        if (isMounted) {
          setUser(null);
          setProfile(null);
          setAuthMode(AUTH_MODES.UNAUTHENTICATED);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    initSession();

    // Subscribe to real Supabase auth state changes (e.g. tab sync, token refresh, password recovery)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (session?.user) {
          const authUser = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Sakhi User',
            raw: session.user
          };
          setUser(authUser);
          setAuthMode(AUTH_MODES.AUTHENTICATED);
          await loadUserProfile(session.user.id);
        }
      } else if (event === 'SIGNED_OUT') {
        const { mode } = await authService.getCurrentSession();
        if (mode === AUTH_MODES.GUEST) {
          // Keep guest session intact if user chose guest mode
          return;
        }
        setUser(null);
        setProfile(null);
        setAuthMode(AUTH_MODES.UNAUTHENTICATED);
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (credentials) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await authService.login(credentials);
      if (result.success && result.user) {
        setUser(result.user);
        setAuthMode(AUTH_MODES.AUTHENTICATED);
        await loadUserProfile(result.user.id);
        return { success: true, user: result.user };
      } else {
        const errMsg = result.error || 'Invalid credentials. Please try again.';
        setError(errMsg);
        return { success: false, error: errMsg };
      }
    } catch (err) {
      const errMsg = 'An unexpected error occurred during login.';
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await authService.signup(credentials);
      if (result.success && result.user) {
        setUser(result.user);
        setAuthMode(AUTH_MODES.AUTHENTICATED);
        await loadUserProfile(result.user.id);
        return { success: true, user: result.user, message: result.message };
      } else {
        const errMsg = result.error || 'Could not create account. Please try again.';
        setError(errMsg);
        return { success: false, error: errMsg };
      }
    } catch (err) {
      const errMsg = 'An unexpected error occurred during account creation.';
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const continueAsGuest = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const result = await authService.continueAsGuest();
      if (result.success && result.user) {
        setUser(result.user);
        setProfile(null);
        setAuthMode(AUTH_MODES.GUEST);
        return { success: true, user: result.user };
      }
      return { success: false, error: 'Could not enter Guest mode.' };
    } catch (err) {
      return { success: false, error: 'Failed to enter guest mode.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setProfile(null);
      setAuthMode(AUTH_MODES.UNAUTHENTICATED);
      setError(null);
      setIsLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setError(null);
    return authService.resetPassword(email);
  };

  const updatePassword = async (newPassword) => {
    setError(null);
    return authService.updatePassword(newPassword);
  };

  const updateProfile = async (updates) => {
    if (!user?.id) return { success: false, error: 'No authenticated user' };
    const updated = await profileService.updateCurrentProfile(user.id, updates);
    if (updated) {
      setProfile(updated);
      return { success: true, profile: updated };
    }
    return { success: false, error: 'Failed to update profile' };
  };

  const clearError = () => setError(null);

  const value = {
    user,
    profile,
    authMode,
    isAuthenticated: authMode === AUTH_MODES.AUTHENTICATED,
    isGuest: authMode === AUTH_MODES.GUEST,
    isUnauthenticated: authMode === AUTH_MODES.UNAUTHENTICATED,
    isLoading,
    loading: isLoading,
    error,
    login,
    signIn: login,
    signup,
    signUp: signup,
    continueAsGuest,
    logout,
    signOut: logout,
    resetPassword,
    updatePassword,
    updateProfile,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


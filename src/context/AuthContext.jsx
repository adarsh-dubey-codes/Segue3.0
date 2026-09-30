import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth/authService';
import { AUTH_MODES } from '../types/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(AUTH_MODES.UNAUTHENTICATED);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore initial session on mount
  useEffect(() => {
    let isMounted = true;
    async function initSession() {
      try {
        const { user: restoredUser, mode } = await authService.getCurrentSession();
        if (isMounted) {
          if (restoredUser && mode !== AUTH_MODES.UNAUTHENTICATED) {
            setUser(restoredUser);
            setAuthMode(mode);
          } else {
            setUser(null);
            setAuthMode(AUTH_MODES.UNAUTHENTICATED);
          }
        }
      } catch (err) {
        console.error('Session initialization error:', err);
        if (isMounted) {
          setUser(null);
          setAuthMode(AUTH_MODES.UNAUTHENTICATED);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    initSession();
    return () => {
      isMounted = false;
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
        return { success: true, user: result.user };
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
      setAuthMode(AUTH_MODES.UNAUTHENTICATED);
      setError(null);
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    authMode,
    isAuthenticated: authMode === AUTH_MODES.AUTHENTICATED,
    isGuest: authMode === AUTH_MODES.GUEST,
    isUnauthenticated: authMode === AUTH_MODES.UNAUTHENTICATED,
    isLoading,
    error,
    login,
    signup,
    continueAsGuest,
    logout,
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

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const STORAGE_KEY_AUTH = 'sakhi_user_session_v2';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading auth session:', e);
    }
    return { name: 'Sakhi User', email: 'user@sakhicycle.com' };
  });

  const login = (email, password) => {
    const newUser = {
      name: email.split('@')[0],
      email: email
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(newUser));
    return true;
  };

  const signup = (name, email, password) => {
    const newUser = {
      name: name || email.split('@')[0],
      email: email
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

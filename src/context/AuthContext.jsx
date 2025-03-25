import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, setUserData, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUserData(userData);
    setUser(userData);
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout: logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('gov_scheme_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('gov_scheme_token');
      if (storedToken) {
        try {
          const res = await authApi.getCurrentUser();
          setUser(res.data);
        } catch (err) {
          console.error('Failed to load current user from token:', err);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    const { token: jwt, userId, fullName, role, profileCompleted } = res.data;
    
    localStorage.setItem('gov_scheme_token', jwt);
    setToken(jwt);
    
    const userData = { userId, email, fullName, role, profileCompleted };
    setUser(userData);
    localStorage.setItem('gov_scheme_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (userData) => {
    const res = await authApi.register(userData);
    const { token: jwt, userId, email, fullName, role, profileCompleted } = res.data;
    
    localStorage.setItem('gov_scheme_token', jwt);
    setToken(jwt);
    
    const userObj = { userId, email, fullName, role, profileCompleted };
    setUser(userObj);
    localStorage.setItem('gov_scheme_user', JSON.stringify(userObj));
    return userObj;
  };

  const logout = () => {
    localStorage.removeItem('gov_scheme_token');
    localStorage.removeItem('gov_scheme_user');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await authApi.getCurrentUser();
      setUser(res.data);
      localStorage.setItem('gov_scheme_user', JSON.stringify(res.data));
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'ROLE_ADMIN',
    isCitizen: user?.role === 'ROLE_CITIZEN',
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
      setCredits(response.data.credits || 0);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, user: userData } = response.data;
    localStorage.setItem('token', access_token);
    setUser(userData);
    setCredits(userData.credits || 0);
    return userData;
  };

  const signup = async (email, password, name) => {
    const response = await api.post('/auth/signup', { email, password, name });
    const { access_token, user: userData } = response.data;
    localStorage.setItem('token', access_token);
    setUser(userData);
    setCredits(userData.credits || 0);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCredits(0);
  };

  const updateCredits = async () => {
    try {
      const response = await api.get('/credits/balance');
      setCredits(response.data.balance);
    } catch (error) {
      console.error('Failed to fetch credits:', error);
    }
  };

  const value = {
    user,
    loading,
    credits,
    login,
    signup,
    logout,
    updateCredits,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    const receivedToken = response.data.token;
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

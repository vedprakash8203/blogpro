import apiRequest from './api';

export const registerUser = async (userData) => {
  return await apiRequest('/authors', 'POST', userData);
};

export const loginUser = async (credentials) => {
  return await apiRequest('/login', 'POST', credentials);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  const user = getCurrentUser();
  return user?.token || null;
};

export const setUserData = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem('user');
};

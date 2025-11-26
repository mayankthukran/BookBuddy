import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://book-buddy-sepia.vercel.app/api'
  : 'http://localhost:3001/api';

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data;
  },

  // Update password
  updatePassword: async (passwordData) => {
    const response = await api.put('/profile/password', passwordData);
    return response.data;
  },

  // Get user statistics
  getUserStats: async () => {
    const response = await api.get('/profile/stats');
    return response.data;
  }
};
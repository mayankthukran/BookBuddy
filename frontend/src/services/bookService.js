import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://book-buddy-sepia.vercel.app/api'
  : 'http://localhost:3001/api';

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const bookService = {
  // Get all books with filters and pagination
  getBooks: async (params = {}) => {
    const response = await api.get('/books', { params });
    return response.data;
  },

  // Get single book
  getBook: async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Create new book
  createBook: async (bookData) => {
    const response = await api.post('/books', bookData);
    return response.data;
  },

  // Update book
  updateBook: async (id, bookData) => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  // Delete book
  deleteBook: async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  }
};
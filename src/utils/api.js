import axios from 'axios';
import { API_URL } from '../config';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 Unauthorized, clear token and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Return formatted error
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.message || 
                        error.message || 
                        'An unexpected error occurred';
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

// Auth API calls
export const authAPI = {
  signup: (data) => api.post('/api/auth/signup', data),
  login: (data) => api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/me'),
};

// Stories API calls
export const storiesAPI = {
  generateFiction: (data) => api.post('/api/generate/fiction', data),
  generateBiography: (data) => api.post('/api/generate/biography', data),
  getAll: () => api.get('/api/stories'),
  getOne: (id) => api.get(`/api/stories/${id}`),
  delete: (id) => api.delete(`/api/stories/${id}`),
};

// Credits API calls
export const creditsAPI = {
  getPacks: () => api.get('/api/credits/packs'),
  purchase: (packId) => api.post('/api/credits/purchase', { pack_id: packId }),
  getBalance: () => api.get('/api/credits/balance'),
};

// Extras API calls
export const extrasAPI = {
  generateCover: (storyId, type) => api.post('/api/extras/cover', { story_id: storyId, cover_type: type }),
  exportEpub: (storyId) => api.post(`/api/extras/epub/${storyId}`, null, { responseType: 'blob' }),
  exportMobi: (storyId) => api.post(`/api/extras/mobi/${storyId}`, null, { responseType: 'blob' }),
  exportPdf: (storyId) => api.post(`/api/extras/pdf/${storyId}`, null, { responseType: 'blob' }),
  generateBlurb: (storyId) => api.post(`/api/extras/blurb/${storyId}`),
  generateAuthorBio: (data) => api.post('/api/extras/author-bio', data),
};

export default api;

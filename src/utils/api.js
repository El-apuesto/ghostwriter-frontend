import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
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

export const authAPI = {
  signup: (data) => api.post('/api/auth/signup', data),
  login: (data) => api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/me'),
};

export const storiesAPI = {
  generateFiction: (data) => api.post('/api/generate/fiction', data),
  generateBiography: (data) => api.post('/api/generate/biography', data),
  getAll: (limit = 50, offset = 0) => api.get(`/api/stories?limit=${limit}&offset=${offset}`),
  getOne: (id) => api.get(`/api/stories/${id}`),
  delete: (id) => api.delete(`/api/stories/${id}`),
};

export const creditsAPI = {
  getPacks: () => api.get('/api/credits/packs'),
  purchase: (packType) => api.post('/api/credits/purchase', { pack_type: packType }),
  getBalance: () => api.get('/api/credits/balance'),
  getTransactions: (limit = 50) => api.get(`/api/credits/transactions?limit=${limit}`),
};

export const extrasAPI = {
  generateCover: (storyId, coverType, premium = false, style = 'dark') => 
    api.post(`/api/extras/cover?story_id=${storyId}&cover_type=${coverType}&premium=${premium}&style=${style}`),
  exportEpub: (storyId) => api.post(`/api/extras/epub/${storyId}`, null, { responseType: 'blob' }),
  exportMobi: (storyId) => api.post(`/api/extras/mobi/${storyId}`, null, { responseType: 'blob' }),
  exportPdf: (storyId) => api.post(`/api/extras/pdf/${storyId}`, null, { responseType: 'blob' }),
  generateBlurb: (storyId) => api.post(`/api/extras/blurb/${storyId}`),
  generateAuthorBio: (bioInfo = null) => api.post('/api/extras/author-bio', { bio_info: bioInfo }),
};

export default api;
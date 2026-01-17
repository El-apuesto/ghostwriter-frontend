// Backend API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'https://ghostwriter-backend-1.onrender.com';

// API endpoints
export const ENDPOINTS = {
  // Auth
  SIGNUP: '/api/auth/signup',
  LOGIN: '/api/auth/login',
  ME: '/api/auth/me',
  
  // Stories
  GENERATE_FICTION: '/api/generate/fiction',
  GENERATE_BIOGRAPHY: '/api/generate/biography',
  STORIES: '/api/stories',
  
  // Credits
  CREDIT_PACKS: '/api/credits/packs',
  PURCHASE_CREDITS: '/api/credits/purchase',
  CREDIT_BALANCE: '/api/credits/balance',
  
  // Extras
  GENERATE_COVER: '/api/extras/cover',
  EXPORT_EPUB: '/api/extras/epub',
  EXPORT_MOBI: '/api/extras/mobi',
  EXPORT_PDF: '/api/extras/pdf',
  GENERATE_BLURB: '/api/extras/blurb',
  GENERATE_AUTHOR_BIO: '/api/extras/author-bio',
};

export default API_URL;

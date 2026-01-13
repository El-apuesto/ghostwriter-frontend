import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Create axios instance with auth interceptor
const api = axios.create({
  baseURL: API_URL
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth endpoints
export const signup = async (email, password, full_name) => {
  const response = await api.post('/api/auth/signup', {
    email,
    password,
    full_name
  })
  return response.data
}

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', {
    email,
    password
  })
  return response.data
}

export const getProfile = async () => {
  const response = await api.get('/api/auth/me')
  return response.data
}

// Credits endpoints
export const getCreditBalance = async () => {
  const response = await api.get('/api/credits/balance')
  return response.data
}

export const getCreditPacks = async () => {
  const response = await api.get('/api/credits/packs')
  return response.data
}

export const purchaseCredits = async (pack_type) => {
  const response = await api.post('/api/credits/purchase', { pack_type })
  return response.data
}

export const getTransactions = async (limit = 50) => {
  const response = await api.get(`/api/credits/transactions?limit=${limit}`)
  return response.data
}

// Story endpoints
export const generateFiction = async (data) => {
  const response = await api.post('/api/generate/fiction', data)
  return response.data
}

export const generateBiography = async (data) => {
  const response = await api.post('/api/generate/biography', data)
  return response.data
}

export const getMyStories = async (limit = 50, offset = 0) => {
  const response = await api.get(`/api/stories?limit=${limit}&offset=${offset}`)
  return response.data
}

export const getStory = async (story_id) => {
  const response = await api.get(`/api/stories/${story_id}`)
  return response.data
}

export const deleteStory = async (story_id) => {
  const response = await api.delete(`/api/stories/${story_id}`)
  return response.data
}

// Legacy sample endpoints (keeping for backwards compatibility)
export const generateFictionSample = async (data) => {
  const response = await axios.post(`${API_URL}/api/generate-fiction-sample`, data)
  return response.data
}

export const generateBiographySample = async (data) => {
  const response = await axios.post(`${API_URL}/api/generate-biography-sample`, data)
  return response.data
}

export const createCheckout = async (story_type, email) => {
  const response = await axios.post(`${API_URL}/api/create-checkout`, {
    story_type,
    email
  })
  return response.data
}

export const createSubscription = async (email) => {
  const response = await axios.post(`${API_URL}/api/create-subscription`, { email })
  return response.data
}
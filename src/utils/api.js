import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

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
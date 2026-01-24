// API utility functions with proper error handling and CORS support

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to make API calls with proper headers
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Stories API
export const storiesAPI = {
  // Get all stories
  getAll: async () => {
    return apiCall('/stories');
  },

  // Get a single story by ID
  getOne: async (id) => {
    if (!id) {
      throw new Error('Story ID is required');
    }
    return apiCall(`/stories/${id}`);
  },

  // Create a new story
  create: async (storyData) => {
    return apiCall('/stories', {
      method: 'POST',
      body: JSON.stringify(storyData),
    });
  },

  // Update a story
  update: async (id, storyData) => {
    if (!id) {
      throw new Error('Story ID is required');
    }
    return apiCall(`/stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(storyData),
    });
  },

  // Delete a story
  delete: async (id) => {
    if (!id) {
      throw new Error('Story ID is required');
    }
    return apiCall(`/stories/${id}`, {
      method: 'DELETE',
    });
  },
};

export default {
  storiesAPI,
};

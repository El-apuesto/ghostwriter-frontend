// API utility functions with proper error handling and CORS support

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

// Auth API
export const authAPI = {
  // Login
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Signup
  signup: async (username, email, password) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },

  // Get current user
  getMe: async (token) => {
    return apiCall('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Logout (if needed)
  logout: async (token) => {
    return apiCall('/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
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
  authAPI,
  storiesAPI,
};

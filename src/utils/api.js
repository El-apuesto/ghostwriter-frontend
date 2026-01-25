const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.message || `HTTP error! status: ${response.status}`);
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
  // Login - accepts object { email, password }
  login: async ({ email, password }) => {
    return apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Signup - accepts object { name, email, password }
  signup: async ({ name, email, password }) => {
    return apiCall('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ 
        full_name: name, // Backend expects 'full_name'
        email, 
        password 
      }),
    });
  },

  // Get current user - reads token from localStorage
  getMe: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    return apiCall('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Logout (if needed)
  logout: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    
    return apiCall('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Credits API
export const creditsAPI = {
  // Get user's credit balance
  getBalance: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    
    return apiCall('/api/auth/me', {
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
    const token = localStorage.getItem('token');
    return apiCall('/api/stories', {
      headers: token ? {
        'Authorization': `Bearer ${token}`,
      } : {},
    });
  },

  // Get a single story by ID
  getOne: async (id) => {
    if (!id) {
      throw new Error('Story ID is required');
    }
    const token = localStorage.getItem('token');
    return apiCall(`/api/stories/${id}`, {
      headers: token ? {
        'Authorization': `Bearer ${token}`,
      } : {},
    });
  },

  // Create a new story
  create: async (storyData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required to create stories');
    }
    
    return apiCall('/api/stories', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(storyData),
    });
  },

  // Update a story
  update: async (id, storyData) => {
    if (!id) {
      throw new Error('Story ID is required');
    }
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required to update stories');
    }
    
    return apiCall(`/api/stories/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(storyData),
    });
  },

  // Delete a story
  delete: async (id) => {
    if (!id) {
      throw new Error('Story ID is required');
    }
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required to delete stories');
    }
    
    return apiCall(`/api/stories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

export default {
  authAPI,
  creditsAPI,
  storiesAPI,
};

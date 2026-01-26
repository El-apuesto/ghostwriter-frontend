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

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }
  return {
    'Authorization': `Bearer ${token}`,
  };
};

// Auth API
export const authAPI = {
  login: async ({ email, password }) => {
    return apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  signup: async ({ name, email, password }) => {
    return apiCall('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ 
        full_name: name,
        email, 
        password 
      }),
    });
  },

  getMe: async () => {
    return apiCall('/api/auth/me', {
      headers: getAuthHeaders(),
    });
  },

  logout: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    return apiCall('/api/auth/logout', {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },
};

// Credits API
export const creditsAPI = {
  getBalance: async () => {
    return apiCall('/api/auth/me', {
      headers: getAuthHeaders(),
    });
  },
};

// Stories API
export const storiesAPI = {
  getAll: async () => {
    return apiCall('/api/stories', {
      headers: getAuthHeaders(),
    });
  },

  getOne: async (id) => {
    if (!id) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${id}`, {
      headers: getAuthHeaders(),
    });
  },

  create: async (storyData) => {
    return apiCall('/api/stories/generate', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(storyData),
    });
  },

  update: async (id, storyData) => {
    if (!id) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(storyData),
    });
  },

  delete: async (id) => {
    if (!id) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },

  generateBiography: async (biographyData) => {
    return apiCall('/api/stories/generate-biography', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(biographyData),
    });
  },
};

// Covers API
export const coversAPI = {
  generateBasic: async (storyId) => {
    if (!storyId) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${storyId}/cover/basic`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },

  generateAI: async (storyId) => {
    if (!storyId) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${storyId}/cover/ai`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },

  generatePrint: async (storyId) => {
    if (!storyId) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${storyId}/cover/print`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },
};

// Exports API
export const exportsAPI = {
  toEPUB: async (storyId) => {
    if (!storyId) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${storyId}/export/epub`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },

  toPDF: async (storyId) => {
    if (!storyId) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${storyId}/export/pdf`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },

  toMOBI: async (storyId) => {
    if (!storyId) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${storyId}/export/mobi`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },
};

// Extras API
export const extrasAPI = {
  generateBlurb: async (storyId) => {
    if (!storyId) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${storyId}/blurb`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },

  generateAuthorBio: async (storyId) => {
    if (!storyId) throw new Error('Story ID is required');
    return apiCall(`/api/stories/${storyId}/author-bio`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },
};

// Payments API
export const paymentsAPI = {
  getPackages: async () => {
    return apiCall('/api/payments/packages');
  },

  createCheckout: async (packageName) => {
    if (!packageName) throw new Error('Package name is required');
    return apiCall('/api/payments/create-checkout-session', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ package: packageName }),
    });
  },

  verifySession: async (sessionId) => {
    if (!sessionId) throw new Error('Session ID is required');
    return apiCall(`/api/payments/verify-session/${sessionId}`, {
      headers: getAuthHeaders(),
    });
  },
};

export default {
  authAPI,
  creditsAPI,
  storiesAPI,
  coversAPI,
  exportsAPI,
  extrasAPI,
  paymentsAPI,
};

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every outgoing request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gov_scheme_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle session expiration cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized and token was present, clear and let user re-login
      if (localStorage.getItem('gov_scheme_token')) {
        localStorage.removeItem('gov_scheme_token');
        localStorage.removeItem('gov_scheme_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

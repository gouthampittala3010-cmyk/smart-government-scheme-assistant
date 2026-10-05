import api from './client';

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

export const profileApi = {
  getProfile: () => api.get('/profile'),
  saveProfile: (profileData) => api.post('/profile', profileData),
};

export const schemeApi = {
  getAll: () => api.get('/schemes'),
  getById: (id) => api.get(`/schemes/${id}`),
  search: (params) => api.get('/schemes/search', { params }),
  getCategories: () => api.get('/schemes/categories'),
  getMinistries: () => api.get('/schemes/ministries'),
};

export const eligibilityApi = {
  checkUserEligibility: () => api.get('/eligibility/check'),
  checkAnonymous: (profileData) => api.post('/eligibility/check-anonymous', profileData),
  checkScheme: (schemeId) => api.get(`/eligibility/scheme/${schemeId}`),
};

export const adminApi = {
  getAllSchemes: () => api.get('/admin/schemes'),
  createScheme: (data) => api.post('/admin/schemes', data),
  updateScheme: (id, data) => api.put(`/admin/schemes/${id}`, data),
  deleteScheme: (id) => api.delete(`/admin/schemes/${id}`),
  getStats: () => api.get('/admin/stats'),
};

export const aiApi = {
  askAssistant: (data) => api.post('/ai/ask', data),
};

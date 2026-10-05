import api from './client';
import { INITIAL_SCHEMES, evaluateEligibilityLocally } from './mockData';

// Storage helper for local fallback mode
const getLocalSchemes = () => {
  const stored = localStorage.getItem('gov_local_schemes');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) {}
  }
  return INITIAL_SCHEMES;
};

const saveLocalSchemes = (schemes) => {
  localStorage.setItem('gov_local_schemes', JSON.stringify(schemes));
};

export const authApi = {
  login: async (credentials) => {
    try {
      return await api.post('/auth/login', credentials);
    } catch (err) {
      // Offline / standalone fallback
      const isAdmin = credentials.email.includes('admin');
      const mockUser = {
        token: 'mock_jwt_token_' + Date.now(),
        userId: isAdmin ? 1 : 2,
        email: credentials.email,
        fullName: isAdmin ? 'System Administrator' : 'Ramesh Kumar',
        role: isAdmin ? 'ROLE_ADMIN' : 'ROLE_CITIZEN',
        profileCompleted: true,
      };
      return { data: mockUser };
    }
  },

  register: async (userData) => {
    try {
      return await api.post('/auth/register', userData);
    } catch (err) {
      const mockUser = {
        token: 'mock_jwt_token_' + Date.now(),
        userId: Date.now(),
        email: userData.email,
        fullName: userData.fullName,
        role: userData.role || 'ROLE_CITIZEN',
        profileCompleted: false,
      };
      return { data: mockUser };
    }
  },

  getCurrentUser: async () => {
    try {
      return await api.get('/auth/me');
    } catch (err) {
      const stored = localStorage.getItem('gov_scheme_user');
      if (stored) {
        return { data: JSON.parse(stored) };
      }
      return {
        data: {
          userId: 2,
          email: 'citizen@example.com',
          fullName: 'Ramesh Kumar',
          role: 'ROLE_CITIZEN',
          profileCompleted: true,
        },
      };
    }
  },
};

export const profileApi = {
  getProfile: async () => {
    try {
      return await api.get('/profile');
    } catch (err) {
      const stored = localStorage.getItem('gov_local_profile');
      if (stored) return { data: JSON.parse(stored) };
      return {
        data: {
          age: 28,
          gender: 'Male',
          state: 'Karnataka',
          district: 'Bengaluru Rural',
          annualIncome: 180000,
          occupation: 'Farmer',
          category: 'OBC',
          education: '10th Pass',
          maritalStatus: 'Married',
          disability: false,
          disabilityPercentage: 0,
          minority: false,
          ruralUrban: 'Rural',
          bplCardHolder: true,
          hasLand: true,
          landHoldingHectares: 1.5,
        },
      };
    }
  },

  saveProfile: async (profileData) => {
    localStorage.setItem('gov_local_profile', JSON.stringify(profileData));
    try {
      return await api.post('/profile', profileData);
    } catch (err) {
      return { data: profileData };
    }
  },
};

export const schemeApi = {
  getAll: async () => {
    try {
      return await api.get('/schemes');
    } catch (err) {
      return { data: getLocalSchemes() };
    }
  },

  getById: async (id) => {
    try {
      return await api.get(`/schemes/${id}`);
    } catch (err) {
      const schemes = getLocalSchemes();
      const found = schemes.find((s) => s.id === Number(id)) || schemes[0];
      return { data: found };
    }
  },

  search: async (params) => {
    try {
      return await api.get('/schemes/search', { params });
    } catch (err) {
      let filtered = getLocalSchemes();
      if (params?.keyword) {
        const kw = params.keyword.toLowerCase();
        filtered = filtered.filter(
          (s) =>
            s.name.toLowerCase().includes(kw) ||
            s.briefDescription?.toLowerCase().includes(kw) ||
            s.tags?.toLowerCase().includes(kw) ||
            s.ministry?.toLowerCase().includes(kw)
        );
      }
      if (params?.category && params.category !== 'All Sectors') {
        filtered = filtered.filter((s) => s.category.toLowerCase().includes(params.category.toLowerCase()));
      }
      if (params?.state && params.state !== 'All India') {
        filtered = filtered.filter(
          (s) => s.applicableState === 'All India' || s.applicableState.toLowerCase().includes(params.state.toLowerCase())
        );
      }
      return { data: filtered };
    }
  },

  getCategories: async () => {
    try {
      return await api.get('/schemes/categories');
    } catch (err) {
      return {
        data: [
          'Agriculture & Rural',
          'Healthcare & Wellness',
          'Education & Skill',
          'Housing & Shelter',
          'Financial Inclusion & Business',
          'Social Welfare & Women',
        ],
      };
    }
  },

  getMinistries: async () => {
    try {
      return await api.get('/schemes/ministries');
    } catch (err) {
      return {
        data: [
          'Ministry of Agriculture and Farmers Welfare',
          'Ministry of Health and Family Welfare',
          'Ministry of Rural Development',
          'Ministry of Education',
          'Ministry of Finance',
          'Ministry of Women and Child Development',
          'Ministry of Social Justice and Empowerment',
        ],
      };
    }
  },
};

export const eligibilityApi = {
  checkUserEligibility: async () => {
    try {
      return await api.get('/eligibility/check');
    } catch (err) {
      const profile = (await profileApi.getProfile()).data;
      const schemes = getLocalSchemes();
      const results = schemes.map((s) => evaluateEligibilityLocally(s, profile));
      results.sort((a, b) => b.score - a.score);
      return { data: results };
    }
  },

  checkAnonymous: async (profileData) => {
    try {
      return await api.post('/eligibility/check-anonymous', profileData);
    } catch (err) {
      const schemes = getLocalSchemes();
      const results = schemes.map((s) => evaluateEligibilityLocally(s, profileData));
      results.sort((a, b) => b.score - a.score);
      return { data: results };
    }
  },

  checkScheme: async (schemeId) => {
    try {
      return await api.get(`/eligibility/scheme/${schemeId}`);
    } catch (err) {
      const schemes = getLocalSchemes();
      const scheme = schemes.find((s) => s.id === Number(schemeId)) || schemes[0];
      const profile = (await profileApi.getProfile()).data;
      return { data: evaluateEligibilityLocally(scheme, profile) };
    }
  },
};

export const adminApi = {
  getAllSchemes: async () => {
    try {
      return await api.get('/admin/schemes');
    } catch (err) {
      return { data: getLocalSchemes() };
    }
  },

  createScheme: async (data) => {
    try {
      return await api.post('/admin/schemes', data);
    } catch (err) {
      const schemes = getLocalSchemes();
      const newScheme = { ...data, id: Date.now() };
      schemes.unshift(newScheme);
      saveLocalSchemes(schemes);
      return { data: newScheme };
    }
  },

  updateScheme: async (id, data) => {
    try {
      return await api.put(`/admin/schemes/${id}`, data);
    } catch (err) {
      const schemes = getLocalSchemes().map((s) => (s.id === Number(id) ? { ...s, ...data } : s));
      saveLocalSchemes(schemes);
      return { data: { ...data, id } };
    }
  },

  deleteScheme: async (id) => {
    try {
      return await api.delete(`/admin/schemes/${id}`);
    } catch (err) {
      const schemes = getLocalSchemes().filter((s) => s.id !== Number(id));
      saveLocalSchemes(schemes);
      return { data: { message: 'Deleted' } };
    }
  },

  getStats: async () => {
    try {
      return await api.get('/admin/stats');
    } catch (err) {
      const schemes = getLocalSchemes();
      return {
        data: {
          totalUsers: 14,
          totalCitizens: 12,
          totalProfiles: 11,
          totalSchemes: schemes.length,
          activeSchemes: schemes.filter((s) => s.active).length,
          categoryCounts: {
            'Agriculture & Rural': 1,
            'Healthcare & Wellness': 1,
            'Education & Skill': 1,
            'Housing & Shelter': 1,
            'Financial Inclusion & Business': 2,
            'Social Welfare & Women': 2,
          },
        },
      };
    }
  },
};

export const aiApi = {
  askAssistant: async (data) => {
    try {
      return await api.post('/ai/ask', data);
    } catch (err) {
      const q = (data.message || '').toLowerCase();
      const schemes = getLocalSchemes();
      let matched = schemes.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.tags?.toLowerCase().includes(q) ||
          s.briefDescription?.toLowerCase().includes(q)
      );
      if (matched.length === 0) matched = schemes.slice(0, 3);
      else if (matched.length > 3) matched = matched.slice(0, 3);

      return {
        data: {
          response: `Hello! I analyzed your query **"${data.message}"** and matched **${matched.length} key government scheme(s)**:\n\n` +
            matched.map((m) => `• **${m.name}** (${m.ministry})\n  - Benefit: ${m.benefits}`).join('\n\n') +
            `\n\nClick on any scheme or head to our **Eligibility Checker** for your personalized 0–100% eligibility score!`,
          recommendedSchemes: matched,
          keySuggestions: ['Check my eligibility score', 'View required documents', 'How to apply online'],
        },
      };
    }
  },
};

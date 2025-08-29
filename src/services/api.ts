import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (error.response?.status === 404) {
      toast.error('Resource not found.');
    } else if (error.response?.status === 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please try again.');
    } else if (error.code === 'ERR_NETWORK') {
      toast.error('Network error. Please check your connection.');
    } else {
      console.error('API Error:', error);
    }
    return Promise.reject(error);
  }
);

export const auth = {
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  adminLogin: async (email: string, password: string) => {
    const response = await api.post('/auth/admin-login', { email, password });
    return response.data;
  },

  hostLogin: async (email: string, password: string) => {
    const response = await api.post('/auth/host-login', { email, password });
    return response.data;
  },

  moderatorLogin: async (email: string, password: string) => {
    const response = await api.post('/auth/moderator-login', { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: { name?: string; avatar?: string }) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  getDashboardData: async () => {
    const response = await api.get('/auth/dashboard');
    return response.data;
  },
};

export const tournaments = {
  getAll: async () => {
    const response = await api.get('/tournaments');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/tournaments/${id}`);
    return response.data;
  },

  create: async (data: { 
    title: string; 
    game: string;
    description: string; 
    start_date: string;
    end_date: string;
    prize_pool?: string;
    max_participants?: number;
  }) => {
    const response = await api.post('/tournaments', data);
    return response.data;
  },

  join: async (tournamentId: string) => {
    const response = await api.post(`/tournaments/${tournamentId}/join`);
    return response.data;
  },

  leave: async (tournamentId: string) => {
    const response = await api.delete(`/tournaments/${tournamentId}/leave`);
    return response.data;
  },

  getUserTournaments: async () => {
    const response = await api.get('/tournaments/user');
    return response.data;
  },
};

export const rewards = {
  getAll: async () => {
    const response = await api.get('/rewards');
    return response.data;
  },

  claim: async (rewardId: string) => {
    const response = await api.post('/rewards/claim', { rewardId });
    return response.data;
  },

  getUserRewards: async () => {
    const response = await api.get('/rewards/user');
    return response.data;
  },
};

export const games = {
  getAll: async () => {
    const response = await api.get('/games');
    return response.data;
  },

  submit: async (data: {
    title: string;
    developer: string;
    genre: string;
    description?: string;
    image_url?: string;
  }) => {
    const response = await api.post('/games', data);
    return response.data;
  },

  updateStatus: async (gameId: string, status: string) => {
    const response = await api.put(`/games/${gameId}/status`, { status });
    return response.data;
  },
};

export default api;
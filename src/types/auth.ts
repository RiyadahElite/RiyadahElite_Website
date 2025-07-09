export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  points?: number;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface Tournament {
  id: string;
  title: string;
  game_name: string;
  description?: string;
  start_date: string;
  end_date: string;
  prize_pool?: string;
  max_participants: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  created_by: string;
  created_at: string;
}

export interface Reward {
  id: string;
  title: string;
  description?: string;
  points_required: number;
  category: string;
  image_url?: string;
  stock: number;
  is_active: boolean;
  created_at: string;
}

export interface Game {
  id: string;
  title: string;
  developer: string;
  genre: string;
  description?: string;
  status: 'pending' | 'approved' | 'testing' | 'completed' | 'rejected';
  image_url?: string;
  submitted_by: string;
  created_at: string;
}